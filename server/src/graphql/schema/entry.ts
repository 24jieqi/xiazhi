import { LanguageType } from "@prisma/client";
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
          return null
        }
        return ctx.prisma.user.findUnique({
          where: {
            user_id: root.creator
          }
        })
      }
    })
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
    t.date("createdAt");
    t.date("updatedAt");
    t.boolean("public");
    t.boolean("archive");
    t.boolean("deleted");
    t.string("mainLangText");
    t.field("mainLang", {
      type: "LanguageTypeEnum",
      description: "支持的语言",
    });
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
      description: "创建词条，默认情况下都为公共词条",
      type: "Int",
      args: {
        appId: intArg(),
        langs: "JSONObject",
        key: stringArg(),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req);
        const mainLangText = args.langs[LanguageType.CHINESE];
        if (!mainLangText) {
          throw new Error("必须填写词条中文！");
        }
        if (args.appId) {
          const records = await ctx.prisma.entry.findMany({
            where: {
              app: {
                some: {
                  app_id: args.appId,
                },
              },
              mainLangText: mainLangText,
            },
          });
          if (records && records.length) {
            throw new Error("无法新增已经存在的词条");
          }
        }
        const entry = await ctx.prisma.entry.create({
          data: {
            key: args.key,
            langs: args.langs,
            mainLangText: args.langs[LanguageType.CHINESE], // 设置主语言文本
            public: !args.appId,
          },
        });
        // 传入appId后，关联到APP中
        if (args.appId) {
          await ctx.prisma.app.update({
            where: {
              app_id: args.appId,
            },
            data: {
              entries: {
                connect: [{ entry_id: entry.entry_id }],
              },
            },
          });
        }
        return entry.entry_id;
      },
    });
    t.field("changeEntryPublicStatus", {
      type: "Boolean",
      description: "切换词条的公有/私有状态",
      args: {
        appId: nonNull(intArg()),
        entryId: nonNull(intArg()),
        public: nonNull(booleanArg()),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req);
        const isPublic = args.public;
        const currentEntry = await ctx.prisma.entry.findUnique({
          where: {
            entry_id: args.entryId,
          },
        });
        /**
         * 如果是从私有变成公有，操作步骤如下：
         * 1. 查找公共库词条，如果有匹配词条，则复制词条翻译到公共词条，否则将此词条变更为公共词条，并建立关联关系
         * 2. 创建与当前APP的关联关系
         * 3. 添加一条操作记录
         */
        if (isPublic) {
          const targetEntry = await ctx.prisma.entry.findFirst({
            where: {
              public: true,
              mainLangText: currentEntry?.mainLangText,
            },
          });
          if (!targetEntry) {
            await ctx.prisma.entry.update({
              where: {
                entry_id: args.entryId,
              },
              data: {
                public: true,
              },
            });
          } else {
            // 创建一条修改记录
            const record = await ctx.prisma.record.create({
              data: {
                prevLangs: targetEntry.langs!,
              },
            });
            // 更新公共词条
            await ctx.prisma.entry.update({
              where: {
                entry_id: targetEntry.entry_id,
              },
              data: {
                langs: currentEntry?.langs!,
                modifyRecords: {
                  connect: [
                    {
                      record_id: record.record_id,
                    },
                  ],
                },
                app: {
                  connect: [
                    {
                      app_id: args.appId,
                    },
                  ],
                },
              },
            });
            // 取消原词条与用户的关联
            await ctx.prisma.app.update({
              where: {
                app_id: args.appId,
              },
              data: {
                entries: {
                  disconnect: [
                    {
                      entry_id: currentEntry?.entry_id,
                    },
                  ],
                },
              },
            });
          }
        }
        return true;
      },
    });
    t.field("updateEntry", {
      type: "Boolean",
      args: {
        entryId: nonNull(intArg()),
        langs: "JSONObject",
        key: stringArg(),
      },
      async resolve(_, args, ctx) {
        const { userId } = decodedToken(ctx.req)!;
        const currentEntry = await ctx.prisma.entry.findUnique({
          where: {
            entry_id: args.entryId,
          },
        });
        await ctx.prisma.entry.update({
          where: {
            entry_id: args.entryId,
          },
          data: {
            key: args.key,
            langs: args.langs,
            mainLangText: args.langs[LanguageType.CHINESE], // 设置主语言文本
            modifyRecords: {
              create: [
                {
                  prevLangs: currentEntry?.langs || {},
                  currLangs: args.langs,
                  prevKey: currentEntry?.key,
                  currKey: args.key,
                  creator: userId
                },
              ],
            },
          },
        });
        return true;
      },
    });
    t.field('changeEntryAccessStatus', {
      type: 'Boolean',
      description: '归档词条或者删除词条（仅针对非公共词条）',
      args: {
        appId: nonNull(intArg()),
        entryId: nonNull(intArg()),
        archive: booleanArg(),
        deleted: booleanArg()
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req)
        // 不允许可逆操作
        if (args.deleted === false || args.archive === false) {
          throw new Error('归档/删除是不可逆操作！')
        }
        const entry = await ctx.prisma.entry.findUnique({
          where: {
            entry_id: args.entryId
          },
          include: {
            app: true
          }
        })
        // 无法操作公共词条
        if (entry?.public) {
          throw new Error('无法更改公共词条状态')
        }
        // 只有词条和APPId是匹配的，才进行更新
        if (entry?.app && entry.app.find(app => app.app_id === args.appId)) {
          await ctx.prisma.entry.update({
            where: {
              entry_id: args.entryId
            },
            data: {
              archive: args.archive || undefined,
              deleted: args.deleted || undefined,
              app: {
                disconnect: args.deleted ? [{ app_id: args.appId }] : undefined
              }
            }
          })
          return true
        }
        throw new Error('参数不匹配，请检测后重试')
      }
    })
  },
});

export const EntryQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("pageAllPublicEntries", {
      type: "EntryPaging",
      description: "获取所有公共词条（分页）",
      args: {
        pageSize: nonNull(intArg()),
        pageNo: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req);
        const records = await ctx.prisma.entry.findMany({
          where: {
            public: true,
          },
          skip: (args.pageNo - 1) * args.pageSize,
          take: args.pageSize,
        });
        const total = await ctx.prisma.entry.count({
          where: {
            public: true,
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
      description: "获取应用所有词条（分页）",
      args: {
        pageSize: nonNull(intArg()),
        pageNo: nonNull(intArg()),
        appId: nonNull(intArg()),
        startTime: floatArg(),
        endTime: floatArg(),
        mainLangText: stringArg(),
        latest: booleanArg(),
        key: stringArg(),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req);
        const records = await ctx.prisma.entry.findMany({
          where: {
            app: {
              some: {
                app_id: args.appId,
              },
            },
            mainLangText: {
              contains: args.mainLangText || undefined,
            },
            key: args.key,
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
            app: {
              some: {
                app_id: args.appId,
              },
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
  },
});
