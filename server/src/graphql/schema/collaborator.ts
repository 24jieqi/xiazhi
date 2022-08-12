import { extendType, intArg, list, nonNull, objectType } from "nexus";
import { decodedToken } from "../token";

export const CollaborateInfo = objectType({
  name: 'CollaborateInfo',
  description: '协作信息项',
  definition(t) {
    t.nonNull.date("assignedAt")
    t.field("collaborator", {
      type: "UserInfo",
    })
    t.field("app", { type: "AppItem" })
  },
})

export const CollaboratorQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAppCollaborators", {
      description: "获取应用的协作者列表",
      type: list(CollaborateInfo),
      args: {
        appId: nonNull(intArg())
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req)
        const res = await ctx.prisma.collaboratorsOnApps.findMany({
          where: {
            appId: args.appId
          },
          include: {
            collaborator: true,
            app: true
          }
        })
        return res
      }
    })
  },
})

export const CollaboratorMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("inviteCollaborators", {
      description: "邀请协作者",
      type: 'Boolean',
      args: {
        appId: nonNull(intArg()),
        userIdList: nonNull(list(nonNull(intArg())))
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req)
        const data = args.userIdList.map(userId => ({
          collaboratorId: userId
        }))
        await ctx.prisma.app.update({
          where: {
            app_id: args.appId,
          },
          data: {
            CollaboratorsOnApps: {
              createMany: {
                data
              }
            }
          }
        })
        return true
      }
    })
    t.field("removeCollaborators", {
      description: "移除协作者",
      type: 'Boolean',
      args: {
        appId: nonNull(intArg()),
        userIdList: nonNull(list(nonNull(intArg())))
      },
      async resolve(_, args, ctx) {
        const info = decodedToken(ctx.req)
        const app = await ctx.prisma.app.findUnique({
          where: {
            app_id: args.appId,
          }
        })
        // 如果APP没找到或者当前用户不是创建者
        if (!app || app.creatorId !== info?.userId) {
          return false
        }
        // 删除记录
        await ctx.prisma.collaboratorsOnApps.deleteMany({
          where: {
            appId: args.appId,
            collaboratorId: {
              in: args.userIdList
            }
          }
        })
        return true
      }
    })
    t.field("existCollaboration", {
      description: "退出协作",
      type: "Boolean",
      args: {
        appId: nonNull(intArg())
      },
      async resolve(_, args, ctx) {
        const info = decodedToken(ctx.req)
        await ctx.prisma.collaboratorsOnApps.delete({
          where: {
            collaboratorId_appId: {
              appId: args.appId,
              collaboratorId: info?.userId!
            }
          }
        })
        return true
      }
    })
  },
})