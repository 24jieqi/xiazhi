import { AppType, LanguageType } from '@prisma/client'
import { objectType, queryType, mutationType, stringArg, nonNull, intArg, enumType, list, extendType } from 'nexus'
import bcrypt from 'bcrypt'
import { decodedToken } from '../token'

export const AppTypeEnum = enumType({
  description: '应用类型枚举',
  name: 'AppTypeEnum',
  members: AppType
})

export const LanguageTypeEnum = enumType({
  description: '应用支持的语言枚举',
  name: 'LanguageTypeEnum',
  members: LanguageType
})

export const AppItem = objectType({
  name: 'AppItem',
  description: '应用基本信息',
  definition(t) {
    t.int('app_id')
    t.string('name')
    t.string('description')
    t.field('type', { type: AppTypeEnum })
    t.field('languages', {
      type: list('LanguageTypeEnum'),
      description: '支持的语言'
    })
    t.list.string('pictures', { description: '应用截图' })
    t.boolean('access', { description: '是否可访问' })
    t.boolean('push', { description: '是否支持词条推送' })
    t.int('creatorId')
    t.field('creator', { type: 'UserInfo', description: '创建者', async resolve(root, _, ctx) {
      return await ctx.prisma.user.findUnique({
        where: {
          user_id: root.creatorId!
        }
      })
    } })
    t.field('entryCount', {
      type: 'Int',
      description: '当前应用包含的词条数量',
      async resolve(root, _, ctx) {
        const app = await ctx.prisma.app.findUnique({
          where: {
            app_id: root.app_id! 
          },
          include: {
            entries: true
          }
        })
        return app?.entries?.length || 0
      }
    })
  },
})

export const AppQuery = queryType({
  definition(t) {
    t.field('getAppInfoById', {
      description: '通过应用id获取应用基本信息',
      args: {
        id: nonNull(intArg()),
      },
      type: 'AppItem',
      async resolve(_root,args, ctx) {
        const decoded = decodedToken(ctx.req)
        return await ctx.prisma.app.findFirst({
          where: {
            app_id: args.id,
            creatorId: decoded?.userId
          },
        })
      }
    })
    t.field('getCurrentApps', {
      description: '获取当前用户创建的应用列表',
      type: list('AppItem'),
      async resolve(_root, _, ctx) {
        const decoded = decodedToken(ctx.req)
        return ctx.prisma.app.findMany({
          where: {
            creatorId: decoded?.userId
          }
        })
      }
    })
  }
})

export const AppMutation =  mutationType({
  definition(t) {
    t.field('createApp', {
      description: '创建应用',
      type: 'Int',
      args: {
        name: nonNull(stringArg()),
        description: stringArg(),
        type: nonNull(AppTypeEnum),
        languages: nonNull(list(nonNull('LanguageTypeEnum'))),
        pictures: nonNull(list(nonNull('String'))),
      },
      async resolve(_, args, ctx) {
        const decoded = decodedToken(ctx.req)
        // 创建应用
        const app = await ctx.prisma.app.create({
          data: {
            name: args.name,
            description: args.description,
            type: args.type,
            languages: args.languages,
            pictures: args.pictures,
          },
        })
        // 更新客户&建立关联管理
        await ctx.prisma.user.update({
          where: {
            user_id: decoded?.userId,
          },
          data: {
            apps: {
              connect: [{
                app_id: app.app_id
              }],
            }
          }
        })
        return app.app_id
      }
    })
  }
})

export const AppAccessInfo = objectType({
  name: 'AppAccessInfo',
  description: '应用权限&访问相关的信息',
  definition(t) {
    t.nonNull.int('app_id')
    t.string('name')
    t.boolean('deleted', { description: '是否已经删除' })
    t.boolean('archived', { description: '是否已经归档（不可以再编辑应用&应用词条）' })
    t.boolean('push', { description: '是否支持进行词条推送' })
    t.boolean('access', { description: '应用是否可以访问' })
    t.string('accessKey', { description: '应用访问key，重置后失效' })
  }
})

export const AppAccessQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getAccessKeyByAppId', {
      type: 'AppAccessInfo',
      description: '根据应用id获取应用权限&访问相关的信息',
      args: {
        id: nonNull(intArg())
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.app.findUnique({
          where: {
            app_id: args.id
          }
        })
      }
    })
  }
})

export const AppAccessMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('refreshAccessKey', {
      type: 'Boolean',
      description: '刷新应用accessKey',
      args: {
        id: nonNull(intArg())
      },
      async resolve(_, args, ctx) {
        const accessKey = await bcrypt.hash(String(Date.now()), 10)
        await ctx.prisma.app.update({
          where: {
            app_id: args.id
          },
          data: {
            accessKey
          }
        })
        return true
      }
    })
    t.field('archivedApp', {
      type: 'Boolean',
      description: '归档一个应用（归档后不能再编辑）',
      args: {
        id: nonNull(intArg())
      },
      async resolve(_, args, ctx) {
        await ctx.prisma.app.update({
          where: {
            app_id: args.id
          },
          data: {
            archived: true
          }
        })
        return true
      }
    })
    t.field('deleteApp', {
      type: 'Boolean',
      description: '删除一个应用（逻辑删除），删除后应用对客户不可见',
      args: {
        id: nonNull(intArg())
      },
      async resolve(_, args, ctx) {
        await ctx.prisma.app.update({
          where: {
            app_id: args.id
          },
          data: {
            deleted: true,
            creator: {
              disconnect: true
            }
          },
          include: {
            creator: true
          }
        })
        return true 
      }
    })
  }
})

