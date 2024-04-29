import prisma from 'prisma/prisma'

import { builder } from '@/builder'

import { groupUploadedEntries } from './utils'

export const ExtractEntryItem = builder.inputType('ExtractEntryItem', {
  fields(t) {
    return {
      key: t.string(),
      mainLang: t.string({ required: true }),
      mainLangText: t.string({ required: true }),
      langs: t.field({ type: 'JSON', required: true }),
    }
  },
})

type UpdateEntryArgs = {
  entryId: number
  langs?: any
  key?: string
}

type PagingAppEntryArgs = {
  pageSize: number
  pageNo: number
  appId: number
  mainLangText?: string
  key?: string
}

type CreateEntryArgs = {
  appId: number
  key: string
  langs: any
}

export class EntryDataSource {
  public static async createEntry({ appId, key, langs }: CreateEntryArgs) {
    const mainLangText = langs['zh']
    if (!mainLangText) {
      throw new Error('必须填写词条中文！')
    }
    const records = await prisma.entry.findMany({
      where: {
        appId,
        mainLangText: mainLangText,
        deleted: false,
      },
    })
    if (records.length) {
      throw new Error('无法新增已经存在的词条')
    }
    const entry = await prisma.entry.create({
      data: {
        key,
        langs,
        mainLangText, // 设置主语言文本
        appId,
      },
    })
    return entry.entry_id
  }
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
  public static async updateAppEntry({ entryId, langs, key }: UpdateEntryArgs) {
    const currentEntry = await prisma.entry.findUnique({
      where: {
        entry_id: entryId,
      },
    })
    await prisma.entry.update({
      where: {
        entry_id: entryId,
      },
      data: {
        langs: {
          ...(currentEntry?.langs as Object),
          ...langs,
        },
        mainLangText: langs['zh'], // 设置主语言文本
        key,
      },
    })
    return true
  }
  public static async pageAppEntry({
    pageNo,
    pageSize,
    appId,
    mainLangText,
    key,
  }: PagingAppEntryArgs) {
    const records = await prisma.entry.findMany({
      where: {
        deleted: false,
        appId,
        mainLangText: {
          contains: mainLangText || undefined,
        },
        key: {
          contains: key || undefined,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
    })
    const total = await prisma.entry.count({
      where: {
        deleted: false,
        appId,
        mainLangText: {
          contains: mainLangText || undefined,
        },
        key: {
          contains: key || undefined,
        },
      },
    })
    return {
      current: pageNo,
      pageSize,
      records: records,
      total,
    }
  }
}
