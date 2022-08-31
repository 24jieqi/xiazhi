import { formatISO } from "date-fns";
import dayjs from "dayjs";
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

export const CollaboratorStatistics = objectType({
  name: 'CollaboratorStatistics',
  description: "协作者应用统计维度",
  definition(t) {
    t.nonNull.int("userId")
    t.nonNull.int("addCount")
    t.nonNull.int("addCountToday")
    t.nonNull.int("modifyCount")
  }
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
    t.field("getAppCollaboratorsStatistics", {
      description: "获取应用协作者的统计信息",
      type: list(CollaboratorStatistics),
      args: {
        appId: nonNull(intArg())
      },
      async resolve(_, args, ctx) {
        const collaborators = await ctx.prisma.collaboratorsOnApps.findMany({
          where: {
            appId: args.appId
          },
          select: {
            collaboratorId: true
          }
        })
        // 1. 统计用户新增词条数
        const countList = await ctx.prisma.$transaction(collaborators.map(collaborator => ctx.prisma.entry.count({
          where: {
            appApp_id: args.appId,
            createBy: collaborator.collaboratorId
          },
        })))
        // 2. 统计用户当日新增词条数
        const countListToday = await ctx.prisma.$transaction(collaborators.map(collaborator => ctx.prisma.entry.count({
          where: {
            appApp_id: args.appId,
            createBy: collaborator.collaboratorId,
            createdAt: {
              lte: formatISO(dayjs().endOf('day').toDate()),
              gte: formatISO(dayjs().startOf('day').toDate())
            }
          },
        })))
        // 3. 统计用户修改词条数
        const modifyCountList = await ctx.prisma.$transaction(collaborators.map(collaborator => ctx.prisma.record.count({
          where: {
            creator: collaborator.collaboratorId,
            Entry: {
              appApp_id: args.appId
            }
          }
        })))
        // 4. 按照顺序组装数据
        const result = collaborators.map((collaborator, index) => ({
          addCount: countList[index],
          addCountToday: countListToday[index],
          modifyCount: modifyCountList[index],
          userId: collaborator.collaboratorId
        }))
        return result
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
        const targetAppCollaboratorIdList = await ctx.prisma.collaboratorsOnApps.findMany({
          where: {
            appId: args.appId
          },
          select: {
            collaboratorId: true
          }
        })
        // 构造数据前先去除已经存在的用户
        const data = args.userIdList.filter(id => !targetAppCollaboratorIdList.find(item => item.collaboratorId === id)).map(userId => ({
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
              },
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