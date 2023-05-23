import { formatISO } from "date-fns";
import dayjs from "dayjs";
import {
  enumType,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
} from "nexus";
import { decodedToken } from "../token";
import { CollaboratorRole } from "@prisma/client";

export const CollaborateInfo = objectType({
  name: "CollaborateInfo",
  description: "协作信息项",
  definition(t) {
    t.nonNull.date("assignedAt");
    t.nonNull.int("id");
    t.nonNull.field("role", {
      type: "CollaboratorRoleEnum",
    });
    t.field("user", {
      type: "UserInfo",
    });
    t.field("app", { type: "AppItem" });
  },
});

export const CollaboratorStatistics = objectType({
  name: "CollaboratorStatistics",
  description: "协作者应用统计维度",
  definition(t) {
    t.nonNull.int("userId");
    t.nonNull.int("addCount");
    t.nonNull.int("addCountToday");
    t.nonNull.int("modifyCount");
  },
});

export const CollaboratorQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAppCollaborators", {
      description: "协作者: 获取应用的协作者列表",
      type: list(CollaborateInfo),
      args: {
        appId: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req);
        const res = await ctx.prisma.collaborator.findMany({
          where: {
            appId: args.appId,
          },
          include: {
            user: true,
            app: true,
          },
        });
        return res;
      },
    });
    t.field("getAppCollaboratorsStatistics", {
      description: "协作者: 获取应用协作者的统计信息",
      type: list(CollaboratorStatistics),
      args: {
        appId: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        const collaborators = await ctx.prisma.collaborator.findMany({
          where: {
            appId: args.appId,
          },
        });
        // 1. 统计用户新增词条数
        const countList = await ctx.prisma.$transaction(
          collaborators.map((collaborator) =>
            ctx.prisma.entry.count({
              where: {
                appId: args.appId,
                creatorId: collaborator.id,
              },
            })
          )
        );
        // 2. 统计用户当日新增词条数
        const countListToday = await ctx.prisma.$transaction(
          collaborators.map((collaborator) =>
            ctx.prisma.entry.count({
              where: {
                appId: args.appId,
                creatorId: collaborator.id,
                createdAt: {
                  lte: formatISO(dayjs().endOf("day").toDate()),
                  gte: formatISO(dayjs().startOf("day").toDate()),
                },
              },
            })
          )
        );
        // 3. 统计用户修改词条数
        const modifyCountList = await ctx.prisma.$transaction(
          collaborators.map((collaborator) =>
            ctx.prisma.record.count({
              where: {
                creator: collaborator.id,
                entry: {
                  appId: args.appId,
                },
              },
            })
          )
        );
        // 4. 按照顺序组装数据
        const result = collaborators.map((collaborator, index) => ({
          addCount: countList[index],
          addCountToday: countListToday[index],
          modifyCount: modifyCountList[index],
          userId: collaborator.id,
        }));
        return result;
      },
    });
  },
});

const CollaboratorRoleEnum = enumType({
  description: "协作者角色枚举",
  name: "CollaboratorRoleEnum",
  members: CollaboratorRole,
});

const CollaboratorsInput = inputObjectType({
  description: "邀请协作者表单",
  name: "CollaboratorsInput",
  definition(t) {
    t.nonNull.int("userId");
    t.nonNull.field("role", {
      type: CollaboratorRoleEnum,
    });
  },
});

export const CollaboratorMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("inviteCollaborators", {
      description: "协作者: 邀请协作者",
      type: "Boolean",
      args: {
        appId: nonNull(intArg()),
        userIdList: nonNull(list(nonNull(CollaboratorsInput))),
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req);
        const targetAppCollaboratorIdList =
          await ctx.prisma.collaborator.findMany({
            where: {
              appId: args.appId,
            },
            select: {
              id: true,
            },
          });
        // 构造数据前先去除已经存在的用户
        const data = args.userIdList.filter(
          (user) =>
            !targetAppCollaboratorIdList.find((item) => item.id === user.userId)
        );
        // 创建多个协作者
        ctx.prisma.$transaction(
          data.map((user) =>
            ctx.prisma.collaborator.create({
              data: {
                user: {
                  connect: {
                    user_id: user.userId,
                  },
                },
                status: "PENDDING",
                app: {
                  connect: {
                    app_id: args.appId,
                  },
                },
                role: user.role || undefined,
              },
            })
          )
        );
        return true;
      },
    });
    t.field("removeCollaborators", {
      description: "协作者: 移除协作者",
      type: "Boolean",
      args: {
        appId: nonNull(intArg()),
        userIdList: nonNull(list(nonNull(intArg()))),
      },
      async resolve(_, args, ctx) {
        const info = decodedToken(ctx.req);
        const app = await ctx.prisma.app.findUnique({
          where: {
            app_id: args.appId,
          },
        });
        // 如果APP没找到或者当前用户不是创建者
        if (!app || app.creatorId !== info?.userId) {
          return false;
        }
        // 删除记录
        await ctx.prisma.collaborator.deleteMany({
          where: {
            appId: args.appId,
            user: {
              user_id: {
                in: args.userIdList,
              },
            },
          },
        });
        return true;
      },
    });
    t.field("existCollaboration", {
      description: "协作者: 退出协作",
      type: "Boolean",
      args: {
        appId: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        const info = decodedToken(ctx.req);
        await ctx.prisma.collaborator.deleteMany({
          where: {
            appId: args.appId,
            userId: info!.userId,
          },
        });
        return true;
      },
    });
  },
});
