import { LanguageType } from '@prisma/client'
import { extendType, list, objectType } from 'nexus'
import { LanguageTypeEnum } from './app'

export const LangageTypeOption = objectType({
  name: 'LangageTypeOption',
  description: '平台支持的多语言词条选项',
  definition(t) {
    t.nonNull.string('label')
    t.field('value', {
      type: 'LanguageTypeEnum',
    })
  },
})

export const BasicQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('listSupportLanguage', {
      type: list(LangageTypeOption),
      resolve() {
        return [
          {
            label: '中文',
            value: LanguageType.CHINESE,
          },
          {
            label: '英语',
            value: LanguageType.ENGLISH,
          },
          {
            label: '泰语',
            value: LanguageType.THAI,
          },
          {
            label: '越南语',
            value: LanguageType.VIETNAMESE,
          },
        ]
      },
    })
  },
})
