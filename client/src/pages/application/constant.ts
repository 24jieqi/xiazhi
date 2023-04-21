import langMap from '@/config/langMap'
import { AppTypeEnum } from '@/graphql/generated/types'

type LangMapType = typeof langMap

type LangMapKeyType = keyof LangMapType

type LanguageType = {
  [key in LangMapKeyType]?: string
}

/**
 * APP类型选项列表
 */
export const appTypeOptions = [
  {
    value: AppTypeEnum.Contact,
    label: '社交',
  },
  {
    value: AppTypeEnum.Education,
    label: '教育',
  },
  {
    value: AppTypeEnum.Efficiency,
    label: '效率',
  },
  {
    value: AppTypeEnum.Finance,
    label: '金融',
  },
  {
    value: AppTypeEnum.Game,
    label: '游戏',
  },
  {
    value: AppTypeEnum.Music,
    label: '音乐',
  },
  {
    value: AppTypeEnum.Tool,
    label: '工具',
  },
  {
    value: AppTypeEnum.Other,
    label: '其它',
  },
]

export const appTypeTableEnum = {
  [AppTypeEnum.Contact]: {
    text: '社交',
  },
  [AppTypeEnum.Education]: {
    text: '教育',
  },
  [AppTypeEnum.Efficiency]: {
    text: '效率',
  },
  [AppTypeEnum.Finance]: {
    text: '金融',
  },
  [AppTypeEnum.Game]: {
    text: '游戏',
  },
  [AppTypeEnum.Music]: {
    text: '音乐',
  },
  [AppTypeEnum.Tool]: {
    text: '工具',
  },
  [AppTypeEnum.Other]: {
    text: '其它',
  },
}

export const langKeys = Object.keys(langMap)

/**
 * 语言下拉选项
 */
export const appSupportLangsOptions = langKeys.map(lang => ({
  value: lang,
  label: langMap[lang].zhName,
}))

export const appSupportLangsTableEnum = langKeys.reduce((pre, curr) => {
  return {
    ...pre,
    [curr]: {
      text: langMap[curr].zhName,
    },
  }
}, {})

export const LanguageTypeEnum: LanguageType = langKeys.reduce(
  (pre, curr) => ({
    ...pre,
    [curr]: curr,
  }),
  {},
)
