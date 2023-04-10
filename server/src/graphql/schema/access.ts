import { LanguageType } from "@prisma/client";
import { extendType, list, nonNull, stringArg, inputObjectType } from "nexus";

export const AccessQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllEntries", {
      type: list("EntryItem"),
      args: {
        accessKey: nonNull(stringArg()),
      },
      description: "根据accessKey获取所有应用词条",
      async resolve(_, args, ctx) {
        const app = await ctx.prisma.app.findFirst({
          where: {
            accessKey: args.accessKey,
            access: true,
          },
          include: {
            entries: {
              include: {
                entry: true,
              },
            },
          },
        });
        return [{ ...app?.entries[0].entry }];
      },
    });
  },
});

export const UploadEntryItem = inputObjectType({
  name: "UploadEntryItem",
  description: "新增词条上传信息",
  definition(t) {
    t.string("key");
    t.json("langs");
  },
});

export const AccessMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("uploadEntries", {
      type: "Boolean",
      args: {
        accessKey: stringArg(),
        entries: nonNull(list("UploadEntryItem")),
      },
      async resolve(_, args, ctx) {
        const app = await ctx.prisma.app.findFirst({
          where: {
            accessKey: args.accessKey,
            push: true,
          },
          include: {
            entries: {
              include: {
                entry: true,
              },
            },
          },
        });
        if (!app) {
          throw new Error("accessKey不正确或无权访问此应用");
        }
        // 创建多个词条数据(但会进行一层筛选)
        const entries = args.entries
          .filter((item) => {
            const mainLangText = item?.langs[LanguageType.CHINESE];
            return !app.entries.find(
              (e) => e.entry.mainLangText === mainLangText
            );
          })
          .map((entry) => ({
            key: entry?.key,
            langs: entry?.langs,
            mainLangText: entry?.langs[LanguageType.CHINESE], // 设置主语言文本
            public: false,
            uploaded: true,
          }));
        await ctx.prisma.app.update({
          where: {
            app_id: app.app_id,
          },
          data: {
            entries: {
              create: {
                entry: {
                  create: {
                    ...entries,
                  },
                },
              },
            },
          },
        });
        return true;
      },
    });
  },
});
