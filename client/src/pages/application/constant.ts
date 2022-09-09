import { AppTypeEnum, LanguageTypeEnum } from '@/graphql/generated/types'

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

/**
 * 支持的语言选项列表
 */
export const appSupportLangsOptions = [
  {
    value: LanguageTypeEnum.Chinese,
    label: '中文',
  },
  {
    value: LanguageTypeEnum.English,
    label: '英语',
  },
  {
    value: LanguageTypeEnum.Thai,
    label: '泰语',
  },
  {
    value: LanguageTypeEnum.Vietnamese,
    label: '越南语',
  },
]

export const appSupportLangsTableEnum = {
  [LanguageTypeEnum.Chinese]: {
    text: '中文',
  },
  [LanguageTypeEnum.English]: {
    text: '英语',
  },
  [LanguageTypeEnum.Thai]: {
    text: '泰语',
  },
  [LanguageTypeEnum.Vietnamese]: {
    text: '越南语',
  },
}

export const LANGUAGE_ARRAY = [
  LanguageTypeEnum.Chinese,
  LanguageTypeEnum.English,
  LanguageTypeEnum.Thai,
  LanguageTypeEnum.Vietnamese,
]
