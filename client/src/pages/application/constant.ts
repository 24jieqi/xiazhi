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
