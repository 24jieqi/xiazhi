import { PrismaClient } from '@prisma/client'
import type Koa from 'koa'

import { decodedToken, type DecodedPayload } from './utils/token'

export interface Context {
  prisma: PrismaClient
  req: Koa.ParameterizedContext
  decoded?: DecodedPayload
}

const prisma = new PrismaClient()

export async function createContext({
  ctx,
}: {
  ctx: Koa.ParameterizedContext
}): Promise<Context> {
  const decoded = decodedToken(ctx)
  return {
    prisma,
    req: ctx,
    decoded,
  }
}
