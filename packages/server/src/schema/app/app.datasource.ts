import prisma from 'prisma/prisma'
import bcrypt from 'bcrypt'

type CreateAppArgs = {
  name: string
  languages: string[]
  description?: string
  pictures?: string[]
}

export class AppDataSource {
  public static async createApp({
    name,
    languages,
    description,
    pictures,
  }: CreateAppArgs) {
    const app = await prisma.app.create({
      data: {
        name,
        languages,
        description,
        pictures,
      },
    })
    return app.app_id
  }
  public static async refreshAccessKey(appId: number) {
    const accessKey = await bcrypt.hash(String(Date.now()), 10)
    await prisma.app.update({
      where: {
        app_id: appId,
      },
      data: {
        accessKey,
      },
    })
    return accessKey
  }
  public static getApps() {
    return prisma.app.findMany({
      include: {
        entries: true,
      },
    })
  }
  public static getAppById(appId: number) {
    return prisma.app.findUnique({
      where: {
        app_id: appId,
      },
    })
  }
}
