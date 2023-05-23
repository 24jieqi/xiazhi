import {
  booleanArg,
  extendType,
  floatArg,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { formatISO } from "date-fns";
import { decodedToken } from "../token";
import {
  convertXlsxData,
  readXlsxLocal,
  splitUpdateOrCreateEntries,
} from "../utils/xlsx";

export const RecordItem = objectType({
  name: "RecordItem",
  description: "词条操作记录",
  definition(t) {
    t.nonNull.int("record_id");
    t.date("createdAt");
    t.int("entryEntry_id");
    t.json("prevLangs");
    t.json("currLangs");
    t.string("prevKey");
    t.string("currKey");
    t.int("creator");
    t.field("creatorInfo", {
      type: "UserInfo",
      async resolve(root, _, ctx) {
        if (!root.creator) {
          return null;
        }
        return ctx.prisma.user.findUnique({
          where: {
            user_id: root.creator,
          },
        });
      },
    });
  },
});

export const EntryPaging = objectType({
  name: "EntryPaging",
  description: "词条分页对象",
  definition(t) {
    t.nonNull.int("total");
    t.nonNull.int("pageSize");
    t.nonNull.int("current");
    t.field("records", {
      type: list(EntryItem),
    });
  },
});

export const EntryItem = objectType({
  name: "EntryItem",
  description: "词条基本信息",
  definition(t) {
    t.int("entry_id");
    t.string("key");
    t.int("creatorId");
    t.date("createdAt");
    t.date("updatedAt");
    t.boolean("archive");
    t.boolean("deleted");
    t.string("mainLangText");
    t.string("mainLang");
    t.field("modifyRecords", {
      type: list(RecordItem),
      async resolve(root, _, ctx) {
        return await ctx.prisma.record.findMany({
          where: {
            entryEntry_id: root.entry_id,
          },
        });
      },
    });
    t.json("langs");
  },
});

export const EntryMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createEntry", {
      description: "词条: 创建词条，如果不穿入appId，则创建为公共词条",
      type: "Int",
      args: {
        appId: intArg(),
        langs: nonNull("JSONObject"),
        key: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const info = decodedToken(ctx.req);
        // 主要语言校验
        const mainLangText = args.langs["zh"];
        if (!mainLangText) {
          throw new Error("必须填写词条中文！");
        }
        // 存在性校验
        if (args.appId) {
          const records = await ctx.prisma.entry.findMany({
            where: {
              appId: args.appId,
              mainLangText: mainLangText,
              deleted: false,
            },
          });
          if (records.length) {
            throw new Error("无法新增已经存在的词条");
          }
        }
        // 创建词条
        const entry = await ctx.prisma.entry.create({
          data: {
            key: args.key,
            langs: args.langs,
            mainLangText: args.langs["zh"], // 设置主语言文本
            createBy: {
              connect: {
                user_id: info?.userId,
              },
            },
            belongsTo: {
              connect: {
                app_id: args.appId ? args.appId : undefined,
              },
            },
          },
        });
        return entry.entry_id;
      },
    });
    t.field("updateEntry", {
      description: '词条: 更新单个词条',
      type: "Boolean",
      args: {
        entryId: nonNull(intArg()),
        appId: intArg(),
        langs: "JSONObject",
        key: stringArg(),
      },
      async resolve(_, args, ctx) {
        const { userId } = decodedToken(ctx.req)!;
        const currentEntry = await ctx.prisma.entry.findUnique({
          where: {
            entry_id: args.entryId,
          },
          include: {
            belongsTo: true,
          },
        });
        // 在某个应用中查找排除自身词条key相同的词条列表
        const entries = await ctx.prisma.entry.count({
          where: {
            key: args.key,
            appId: args.appId,
            entry_id: {
              not: args.entryId,
            },
          },
        });
        if (entries > 0) {
          throw new Error("词条key在应用内唯一");
        }
        await ctx.prisma.entry.update({
          where: {
            entry_id: args.entryId,
          },
          data: {
            key: args.key,
            langs: {
              ...(currentEntry?.langs as Object),
              ...args.langs,
            },
            mainLangText: args.langs["zh"], // 设置主语言文本
            modifyRecords: {
              create: [
                {
                  prevLangs: currentEntry?.langs || {},
                  currLangs: args.langs,
                  prevKey: currentEntry?.key,
                  currKey: args.key,
                  creator: userId,
                },
              ],
            },
          },
        });
        return true;
      },
    });
    t.field("changeEntryAccessStatus", {
      type: "Boolean",
      description: "词条: 归档词条或者删除词条（仅针对非公共词条）",
      args: {
        appId: nonNull(intArg()),
        entryId: nonNull(intArg()),
        archive: booleanArg(),
        deleted: booleanArg(),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req);
        // 不允许可逆操作
        if (args.deleted === false || args.archive === false) {
          throw new Error("归档/删除是不可逆操作！");
        }
        const entry = await ctx.prisma.entry.findUnique({
          where: {
            entry_id: args.entryId,
          },
        });
        // 无法操作公共词条
        if (entry && !entry.appId) {
          throw new Error("无法更改公共词条状态");
        }
        // 更新词条（如果是删除，则仅做逻辑删除）
        await ctx.prisma.entry.update({
          where: {
            entry_id: args.entryId,
          },
          data: {
            archive: args.archive || undefined,
            deleted: args.deleted || undefined,
          },
        });
        return true;
      },
    });
    t.field("deleteEntries", {
      type: "Boolean",
      description: "词条: 删除（批量）应用词条",
      args: {
        appId: nonNull(intArg()),
        entryIds: nonNull(list(nonNull(intArg()))),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req);
        // 更新词条标记删除
        await ctx.prisma.entry.updateMany({
          where: {
            entry_id: {
              in: args.entryIds,
            },
          },
          data: {
            deleted: true,
          },
        });
        return true;
      },
    });
    t.field("uploadEntriesXlsx", {
      type: "Boolean",
      description: "词条: 通过excel上传词条",
      args: {
        appId: nonNull(intArg()),
        fileUrl: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const { userId } = decodedToken(ctx.req)!;
        const file = await readXlsxLocal(args.fileUrl);
        const entries = convertXlsxData(file);
        const entriesExist = await ctx.prisma.entry.findMany({
          where: {
            appId: args.appId,
          },
        });
        const result = splitUpdateOrCreateEntries(entries, entriesExist);
        console.log(result);
        // 更新已存在的词条（更新词条/创建编辑记录）
        await ctx.prisma.$transaction(
          result.update.map((item) =>
            ctx.prisma.entry.update({
              where: {
                entry_id: item.prevEntry?.entry_id!,
              },
              data: {
                langs: item.langs,
                modifyRecords: {
                  create: {
                    prevLangs: item.prevEntry?.langs || {},
                    currLangs: item.langs,
                    prevKey: item.prevEntry?.key,
                    currKey: item.key,
                    creator: userId,
                  },
                },
              },
            })
          )
        );
        // 新增词条
        const entriyList = await ctx.prisma.$transaction(
          result.create.map((entry) =>
            ctx.prisma.entry.create({
              data: {
                ...entry,
                appId: args.appId,
              },
            })
          )
        );
        const entryListId = entriyList.map((entry) => ({
          entry_id: entry.entry_id,
        }));
        // 更新应用
        ctx.prisma.app.update({
          where: {
            app_id: args.appId,
          },
          data: {
            entries: {
              connect: entryListId,
            },
          },
        });
        return true;
      },
    });
    t.field("transformEntry", {
      type: "Boolean",
      description: "词条: 公共词条、私有词条相互转换",
      args: {
        entryId: nonNull(intArg()),
        targetAppId: intArg(),
      },
      async resolve(_, args, ctx) {
        const decoded = decodedToken(ctx.req);
        const isPublic = args.targetAppId == undefined; // 是否迁移至公有APP
        // 1. 找到目标词条
        const targetEntry = await ctx.prisma.entry.findUnique({
          where: {
            entry_id: args.entryId,
          },
        });
        // 转换为私有词条，新建一个词条
        if (!isPublic) {
          // 创建一个私有词条
          const entry = await ctx.prisma.entry.create({
            data: {
              key: targetEntry!.key,
              createBy: {
                connect: {
                  user_id: decoded!.userId,
                },
              },
              mainLang: targetEntry!.mainLang,
              mainLangText: targetEntry!.mainLangText,
              langs: targetEntry!.langs as any,
              basedOn: {
                connect: {
                  entry_id: targetEntry?.entry_id,
                },
              },
              belongsTo: {
                connect: {
                  app_id: args.targetAppId || undefined,
                },
              },
            },
          });
          // 更新词条间的关联关系
          await ctx.prisma.entry.update({
            where: {
              entry_id: targetEntry?.entry_id,
            },
            data: {
              base: {
                connect: [{ entry_id: entry.entry_id }],
              },
            },
          });
        } else {
          // 转换为公有词条
          const entries = await ctx.prisma.entry.findMany({
            where: {
              mainLang: targetEntry!.mainLang,
              mainLangText: targetEntry!.mainLangText,
              deleted: false,
            },
          });
          // 如果没有匹配的词条，则创建一个新的公共词条
          if (!entries.length) {
            const entry = await ctx.prisma.entry.create({
              data: {
                key: targetEntry!.key,
                createBy: {
                  connect: {
                    user_id: decoded!.userId,
                  },
                },
                mainLang: targetEntry!.mainLang,
                mainLangText: targetEntry!.mainLangText,
                langs: targetEntry!.langs as any,
                basedOn: {
                  connect: {
                    entry_id: targetEntry?.entry_id,
                  },
                },
              },
            });
            // 更新和原有词条的关联关系
            await ctx.prisma.entry.update({
              where: {
                entry_id: targetEntry?.entry_id,
              },
              data: {
                base: {
                  connect: [{ entry_id: entry.entry_id }],
                },
              },
            });
          } else {
            await ctx.prisma.$transaction(
              entries.map((item) =>
                ctx.prisma.entry.update({
                  where: {
                    entry_id: item.entry_id,
                  },
                  data: {
                    langs: targetEntry!.langs as any,
                    basedOn: {
                      connect: {
                        entry_id: item.entry_id,
                      },
                    },
                  },
                })
              )
            );
            await ctx.prisma.entry.update({
              where: {
                entry_id: targetEntry!.entry_id,
              },
              data: {
                base: {
                  connect: entries.map((i) => ({ entry_id: i.entry_id })),
                },
              },
            });
          }
        }
        return true;
      },
    });
  },
});

export const EntryQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("pageAllPublicEntries", {
      type: "EntryPaging",
      description: "词条: 获取所有公共词条（分页）",
      args: {
        pageSize: nonNull(intArg()),
        pageNo: nonNull(intArg()),
        key: stringArg(),
        mainLangText: stringArg(),
        startTime: floatArg(),
        endTime: floatArg(),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req);
        // 公共词条不允许删除
        const records = await ctx.prisma.entry.findMany({
          where: {
            appId: null,
            key: {
              contains: args.key || "",
            },
            mainLangText: {
              contains: args.mainLangText || "",
            },
            createdAt: {
              lte: args.endTime
                ? formatISO(new Date(args.endTime!))
                : undefined,
              gte: args.startTime
                ? formatISO(new Date(args.startTime!))
                : undefined,
            },
          },
          skip: (args.pageNo - 1) * args.pageSize,
          take: args.pageSize,
        });
        const total = await ctx.prisma.entry.count({
          where: {
            appId: null,
          },
        });
        return {
          current: args.pageNo,
          pageSize: args.pageSize,
          records: records,
          total,
        };
      },
    });
    t.field("pageAppEntries", {
      type: "EntryPaging",
      description: "词条: 获取应用所有词条（分页）",
      args: {
        pageSize: nonNull(intArg()),
        pageNo: nonNull(intArg()),
        appId: nonNull(intArg()),
        startTime: floatArg(),
        endTime: floatArg(),
        mainLangText: stringArg(),
        latest: booleanArg(),
        key: stringArg(),
        archive: booleanArg(),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req);
        const records = await ctx.prisma.entry.findMany({
          where: {
            deleted: false,
            appId: args.appId,
            mainLangText: {
              contains: args.mainLangText || undefined,
            },
            key: args.key || undefined,
            archive: args.archive || undefined,
            createdAt: {
              lte: args.endTime
                ? formatISO(new Date(args.endTime!))
                : undefined,
              gte: args.startTime
                ? formatISO(new Date(args.startTime!))
                : undefined,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: (args.pageNo - 1) * args.pageSize,
          take: args.pageSize,
        });
        const total = await ctx.prisma.entry.count({
          where: {
            deleted: false,
            appId: args.appId,
            mainLangText: {
              contains: args.mainLangText || undefined,
            },
            key: args.key,
            archive: args.archive || undefined,
            createdAt: {
              lte: args.endTime
                ? formatISO(new Date(args.endTime!))
                : undefined,
              gte: args.startTime
                ? formatISO(new Date(args.startTime!))
                : undefined,
            },
          },
        });
        return {
          current: args.pageNo,
          pageSize: args.pageSize,
          records: records,
          total,
        };
      },
    });
    t.field("validEntryKey", {
      description: "词条: 词条key应用内唯一校验",
      type: "Boolean",
      args: {
        appId: intArg(),
        entryId: intArg(),
        key: stringArg(),
      },
      async resolve(_, args, ctx) {
        const targetEntries = await ctx.prisma.entry.count({
          where: {
            deleted: false,
            entry_id: {
              not: args.entryId || undefined,
            },
            key: args.key,
            appId: args.appId,
          },
        });
        if (targetEntries > 0) {
          return false;
        }
        return true;
      },
    });
    t.field("queryPublicEntryByMainText", {
      type: "EntryItem",
      description: "词条: 通过中文查询公共词条",
      args: {
        mainText: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.entry.findFirst({
          where: {
            appId: null,
            mainLang: args.mainText,
          },
        });
      },
    });
  },
});

/**
 * 关于词条和APP关系的更正
 * 1. 词条分为public和private两种
 * 2. 可以公共词条创建（复制）多个词条
 * 3. 应用和词条是一对多的（而非多对多）
 * 4. 删除词条时，词条会被逻辑删除，被逻辑删除的词条会定期进行清理（或者小概率恢复）
 */
