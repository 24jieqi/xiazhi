import type { UserRole } from '@prisma/client'
import { GraphQLError } from 'graphql'

import prisma from 'prisma/prisma'

import { generateToken } from '@/utils/token'

export class UserDataSource {
  public static async getAllUsers() {
    return prisma.user.findMany()
  }
  public static async getUser(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
  public static async regist(
    email: string,
    role: UserRole,
    name?: string | null,
  ) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role,
      },
    })
    return user
  }
  public static async login(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      throw new GraphQLError('Email does not exist!')
    }
    return generateToken(user.id)
  }
}
