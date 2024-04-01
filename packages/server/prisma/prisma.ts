import { PrismaClient as Client } from '@prisma/client'

const prismaClientSingleton = () => {
  return new Client()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

export type PrismaClient = PrismaClientSingleton

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
