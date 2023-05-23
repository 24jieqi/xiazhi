import {
  extendType,
  list,
  nonNull,
  stringArg,
  inputObjectType,
  booleanArg,
} from "nexus";

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
    t.string("mainLangText");
    t.json("langs");
  },
});

export const AccessMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("extractLocalEntries", {
      description: "外部API: 提取本地词条信息",
      type: "Boolean",
      args: {
        accessKey: nonNull(stringArg()),
        entries: nonNull(list("ExtractLocalEntryItem")),
        isCover: booleanArg(),
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
        const currentEntry = args.entries.map((entry) => ({
          ...entry,
          public: false,
          uploaded: true,
        }));
        const oldEntry = app.entries || []
        const addEntryArr = currentEntry.filter(
          (item) =>
            oldEntry.findIndex(
              (oldEntryItem) =>
                oldEntryItem.key === item.key ||
                oldEntryItem.mainLangText === item.mainLangText
            ) === -1
        );
        const addEditEntryArr = currentEntry.filter(
          (item) =>
            oldEntry.findIndex(
              (oldEntryItem) =>
                oldEntryItem.key === item.key ||
                oldEntryItem.mainLangText === item.mainLangText
            ) > -1
        );
        // 是否要覆盖当前已经存在的词条
        if (args.isCover) {
          let editEntryArr = ([] as Array<any>).concat(oldEntry);
          editEntryArr = editEntryArr.map((entry) => {
            const tempArr = addEditEntryArr.find(
              (addEditItem) => addEditItem.key === entry.key
            );
            const returnValue = tempArr
              ? { ...entry, ...tempArr }
              : { ...entry };
            return {
              ...returnValue,
            };
          });
          await ctx.prisma.$transaction(
            editEntryArr.map((entry) => {
              return ctx.prisma.entry.update({
                where: {
                  entry_id: entry.entry_id,
                },
                data: {
                  ...entry,
                },
              });
            })
          );
        }
        // 新增词条
        if (addEntryArr.length > 0) {
          await ctx.prisma.$transaction(
            addEntryArr.map((entry) => {
              return ctx.prisma.entry.create({
                data: {
                  ...entry,
                  belongsTo: {
                    connect: {
                      app_id: app.app_id
                    }
                  }
                },
              });
            })
          )
        }

        return true;
      },
    });
  },
});
