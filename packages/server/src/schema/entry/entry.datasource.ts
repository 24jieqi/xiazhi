import { builder } from '@/builder'
import prisma from 'prisma/prisma'
import { groupUploadedEntries } from './utils'

export const ExtractEntryItem = builder.inputType('ExtractEntryItem', {
  fields(t) {
    return {
      name: t.string(),
      mainLang: t.string({ required: true }),
      mainLangText: t.string({ required: true }),
      langs: t.field({ type: 'JSON', required: true }),
    }
  },
})

type UpdateEntryArgs = {
  entryId: number
  appId: number
  langs?: any
  key?: string
}

export class EntryDataSource {
  public static async uploadEntries(
    ak: string,
    entries: (typeof ExtractEntryItem.$inferInput)[],
  ) {
    const app = await prisma.app.findFirst({
      where: {
        accessKey: ak,
        push: true,
      },
      include: {
        entries: true,
      },
    })
    if (!app) {
      throw new Error('accessKey不正确或无权访问此应用')
    }
    const existedEntries = await prisma.entry.findMany({
      where: {
        appId: app.app_id!,
        deleted: false,
      },
    })
    const result = groupUploadedEntries(entries as any, existedEntries)
    // 批量新增词条
    await prisma.entry.createMany({
      data: result.add.map(item => ({
        key: item.key,
        langs: item.langs,
        mainLang: item.mainLang,
        mainLangText: item.mainLangText,
        appId: app.app_id,
      })),
    })
    // 批量更新
    prisma.$transaction(
      result.modify.map(item =>
        prisma.entry.update({
          where: {
            entry_id: item.prev!.entry_id,
          },
          data: {
            key: item.key,
            mainLang: item.mainLang,
            mainLangText: item.mainLangText,
            langs: {
              ...(item.prev!.langs as any),
              ...item.langs,
            },
          },
        }),
      ),
    )
    return {
      add: result.add.length,
      modify: result.modify.length,
      ignore: result.ignore.length,
    }
  }
  public static async getAppEntries(ak: string) {
    const app = await prisma.app.findFirst({
      where: {
        accessKey: ak,
        access: true,
      },
      include: {
        entries: true,
      },
    })
    // 只返回有key的词条
    return app?.entries?.filter(item => item.key) || []
  }
  public static async updateAppEntry({
    entryId,
    key,
    appId,
    langs,
  }: UpdateEntryArgs) {
    const currentEntry = await prisma.entry.findUnique({
      where: {
        entry_id: entryId,
      },
      include: {
        belongsTo: true,
      },
    })
    const entries = await prisma.entry.count({
      where: {
        key,
        appId,
        entry_id: {
          not: entryId,
        },
      },
    })
    if (entries > 0) {
      throw new Error('词条key在应用内唯一')
    }
    await prisma.entry.update({
      where: {
        entry_id: entryId,
      },
      data: {
        key,
        langs: {
          ...(currentEntry?.langs as Object),
          ...langs,
        },
        mainLangText: langs['zh'], // 设置主语言文本
      },
    })
    return true
  }
}
