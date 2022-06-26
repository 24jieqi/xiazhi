import { PrismaClient } from '@prisma/client'
import prisma from '../prisma/prisma'
import Koa from 'koa'

export type Context = {
  prisma: PrismaClient
  req: Koa.ParameterizedContext
}
export async function createContext({ ctx }: { ctx: Koa.ParameterizedContext }): Promise<Context> {
  return {
    prisma,
    req: ctx,
  }
}
