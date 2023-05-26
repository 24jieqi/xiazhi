import {
  extendType,
  list,
  nonNull,
  stringArg,
  inputObjectType,
  objectType,
} from "nexus";
import { groupUploadedEntries } from "../utils/access";

export const AccessQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllEntries", {
      type: list("EntryItem"),
      args: {
        accessKey: nonNull(stringArg()),
      },
      description: "外部API: 根据accessKey获取所有应用词条",
      async resolve(_, args, ctx) {
        const app = await ctx.prisma.app.findFirst({
          where: {
            accessKey: args.accessKey,
            access: true,
          },
          include: {
            entries: true
          },
        });
        // 只返回有key的词条
        return (
          app?.entries?.filter((item) => item.key) ||
          []
        );
      },
    });
  },
});

export const ExtractLocalEntryItem = inputObjectType({
  name: "ExtractLocalEntryItem",
  description: "提取本地词条信息",
  definition(t) {
    t.string("key");
    t.nonNull.string("mainLang");
    t.nonNull.string("mainLangText");
    t.nonNull.json("langs");
  },
});

export const ExtractResult = objectType({
  name: 'ExtractResult',
  description: '上传结果',
  definition(t) {
    t.int('add', { description: '新增词条数' })
    t.int('modify', { description: '编辑（合并词条数）' })
    t.int('ignore', { description: '跳过词条数（key存在无法合并）' })
  },
})

export const AccessMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("extractLocalEntries", {
      description: "外部API: 本地提取词条上传",
      type: "ExtractResult",
      args: {
        accessKey: nonNull(stringArg()),
        entries: nonNull(list(nonNull("ExtractLocalEntryItem"))),
      },
      async resolve(_, args, ctx) {
        const app = await ctx.prisma.app.findFirst({
          where: {
            accessKey: args.accessKey,
            push: true,
          },
          include: {
            entries: true
          },
        });
        if (!app) {
          throw new Error("accessKey不正确或无权访问此应用");
        }
        // 找出当前应用所有词条
        const existedEntries = await ctx.prisma.entry.findMany({
          where: {
            appId: app.app_id!,
            deleted: false
          }
        })
        // 对当前词条进行分组
        const result = groupUploadedEntries(args.entries, existedEntries)
        // 批量新增词条
        await ctx.prisma.entry.createMany({
          data: result.add.map(item => ({ key: item.key, langs: item.langs, mainLang: item.mainLang, mainLangText: item.mainLangText, appId: app.app_id }))
        })
        // 批量更新词条
        ctx.prisma.$transaction(result.modify.map(item => ctx.prisma.entry.update({
          where: {
            entry_id: item.prev!.entry_id,
          },
          data: {
            key: item.key,
            mainLang: item.mainLang,
            mainLangText: item.mainLangText,
            langs: {
              ...(item.prev!.langs as any),
              ...item.langs
            },
            modifyRecords: {
              create: {
                prevLangs: item.prev!.langs || {},
                currLangs: item.langs,
                prevKey: item.prev!.key,
                currKey: item.key,
              }
            }
          }
        })))
        return {
          add: result.add.length,
          modify: result.modify.length,
          ignore: result.ignore.length
        }
      },
    });
  },
});
