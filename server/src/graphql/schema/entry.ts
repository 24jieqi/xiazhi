import { LanguageType } from '@prisma/client'
import { booleanArg, extendType, intArg, list, nonNull, objectType, stringArg } from 'nexus'
import { decodedToken } from '../token'

export const RecordItem = objectType({
  name: 'RecordItem',
  description: '词条操作记录',
  definition(t) {
    t.nonNull.int('record_id')
    t.date('createdAt')
    t.int('entryEntry_id')
    t.json('prevLangs')
  },
})

export const EntryItem = objectType({
  name: 'EntryItem',
  description: '词条基本信息',
  definition(t) {
    t.nonNull.int('entry_id')
    t.string('key')
    t.date('createdAt')
    t.date('updatedAt')
    t.boolean('public')
    t.boolean('archive')
    t.boolean('deleted')
    t.field('modifyRecords', {
      type: list(RecordItem),
      async resolve(root, _, ctx) {
        return await ctx.prisma.record.findMany({
          where: {
            entryEntry_id: root.entry_id,
          },
        })
      },
    })
    t.json('langs')
  },
})

export const EntryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createEntry', {
      description: '创建词条，默认情况下都为公共词条',
      type: 'Int',
      args: {
        appId: nonNull(intArg()),
        langs: 'JSONObject',
        key: stringArg(),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req)
        const entry = await ctx.prisma.entry.create({
          data: {
            key: args.key,
            langs: args.langs,
            mainLangText: args.langs[LanguageType.CHINESE], // 设置主语言文本
          },
        })
        await ctx.prisma.app.update({
          where: {
            app_id: args.appId,
          },
          data: {
            entries: {
              connect: [{ entry_id: entry.entry_id }],
            },
          },
        })
        return entry.entry_id
      },
    })
    t.field('changeEntryPublicStatus', {
      type: 'Boolean',
      description: '切换词条的公有/私有状态',
      args: {
        appId: nonNull(intArg()),
        entryId: nonNull(intArg()),
        public: nonNull(booleanArg()),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req)
        const isPublic = args.public
        const currentEntry = await ctx.prisma.entry.findUnique({
          where: {
            entry_id: args.entryId,
          },
        })
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
          })
          if (!targetEntry) {
            await ctx.prisma.entry.update({
              where: {
                entry_id: args.entryId,
              },
              data: {
                public: true,
              },
            })
          } else {
            // 创建一条修改记录
            const record = await ctx.prisma.record.create({
              data: {
                prevLangs: targetEntry.langs!,
              },
            })
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
            })
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
            })
          }
        }
        return true
      },
    })
    t.field('updateEntry', {
      type: 'Boolean',
      args: {
        entryId: nonNull(intArg()),
        langs: 'JSONObject',
        key: stringArg(),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req)
        await ctx.prisma.entry.update({
          where: {
            entry_id: args.entryId,
          },
          data: {
            key: args.key,
            langs: args.langs,
            mainLangText: args.langs[LanguageType.CHINESE], // 设置主语言文本
          },
        })
        return true
      },
    })
  },
})

export const EntryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('pageAllPublicEntries', {
      type: list('EntryItem'),
      description: '获取所有公共词条（分页）',
      args: {
        pageSize: nonNull(intArg()),
        pageNo: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req)
        return await ctx.prisma.entry.findMany({
          where: {
            public: true,
          },
          skip: (args.pageNo - 1) * args.pageSize,
          take: args.pageSize,
        })
      },
    })
    t.field('pageAppEntries', {
      type: list('EntryItem'),
      description: '获取应用所有词条（分页）',
      args: {
        pageSize: nonNull(intArg()),
        pageNo: nonNull(intArg()),
        appId: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req)
        return ctx.prisma.entry.findMany({
          where: {
            app: {
              some: {
                app_id: args.appId,
              },
            },
          },
          skip: (args.pageNo - 1) * args.pageSize,
          take: args.pageSize,
        })
      },
    })
  },
})
