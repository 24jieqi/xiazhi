import prisma from 'prisma/prisma'

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
}
