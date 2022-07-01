import { extendType, list, nonNull, objectType, stringArg } from "nexus";

export const LangageTypeOption = objectType({
  name: "LangageTypeOption",
  description: "平台支持的多语言词条选项",
  definition(t) {
    t.nonNull.string("label");
    t.field("value", {
      type: "LanguageTypeEnum",
    });
  },
});

export const BasicQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("listSupportLanguage", {
      type: list(LangageTypeOption),
      async resolve(_, args, ctx) {
        return ctx.prisma.langs.findMany({
          where: {
            disabled: false,
          },
        });
      },
    });
  },
});

export const BasicMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addLangage", {
      type: "Int",
      args: {
        label: nonNull(stringArg()),
        value: nonNull("LanguageTypeEnum"),
      },
      async resolve(_, args, ctx) {
        const lang = await ctx.prisma.langs.create({
          data: {
            label: args.label,
            value: args.value,
          },
        });
        return lang.lang_id;
      },
    });
  },
});
