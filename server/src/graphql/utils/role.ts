import { CollaboratorRole, PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

/**
 * 检查协作者对于APP的管理权限
 * @param userId
 * @param appId
 * @param prisma
 */
export async function checkAppManagementRole(
  userId: number,
  appId: number,
  prisma: PrismaClient
) {
  const targetApp = await prisma.app.findUnique({
    where: {
      app_id: appId,
    },
  });
  // 应用所有者拥有管理权限
  if (targetApp && targetApp.creatorId === userId) {
    return true;
  }
  const targetCollaborator = await prisma.collaborator.findFirst({
    where: {
      userId,
      appId,
    },
  });
  // 管理员角色的协作者
  if (targetCollaborator?.role === CollaboratorRole.MANAGER) {
    return true;
  }
  throw new GraphQLError("no permissions to manage this app!");
}
