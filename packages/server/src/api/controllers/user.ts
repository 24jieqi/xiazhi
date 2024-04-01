import type { Context } from 'koa'

import { response } from '@/utils/response'

import prisma from '../../../prisma/prisma'
export default class UserController {
  public static async getInfo(ctx: Context) {
    const id = Number(ctx.query.id)
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    ctx.status = 200
    response(ctx, {
      data: user,
    })
  }
}
