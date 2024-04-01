import type { Context, Next } from 'koa'

import type { ResolverHandler } from '@/types'
import { response } from '@/utils/response'
import { decodedToken } from '@/utils/token'

type ResolverMiddleware = (next: ResolverHandler) => ResolverHandler
export const authMiddleWare: ResolverMiddleware = next => {
  // eslint-disable-next-line max-params
  return (parent, args, context, info) => {
    const decoded = decodedToken(context.req)!
    return next(parent, args, { ...context, decoded }, info)
  }
}
/**
 * auth middleware restful api
 * @param ctx
 * @param next
 */
export const authMiddleWareRestful = (ctx: Context, next: Next) => {
  try {
    const decoded = decodedToken(ctx)!
    ctx.decoded = decoded
    return next()
  } catch (error) {
    ctx.status = 401
    response(ctx, { code: 401, msg: (error as Error).message })
  }
}
