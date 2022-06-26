import kiwiIntl from 'kiwi-intl'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import zhCNLangs from './langs/zh-CN'
import enUsLangs from './langs/en-US'
import thTHLangs from './langs/th-TH'
import viVNLangs from './langs/vi-VN'
import { IAPI, LangEnum } from './typing'

export type Langs = typeof zhCNLangs & IAPI

export const langs = {
  [LangEnum.zhCN]: zhCNLangs,
  [LangEnum.enUS]: enUsLangs,
  [LangEnum.thTH]: thTHLangs,
  [LangEnum.viVN]: viVNLangs,
}
// 初始化
const I18N = (kiwiIntl.init(LangEnum.zhCN, langs) as any) as Langs
I18N.currentLang = LangEnum.zhCN
// 重写setLang
I18N.setLangHandle = (lang: LangEnum) => {
  I18N.currentLang = lang
  I18N.setLang(lang)
}

// 根据用户上次选择语言重置
const lastLang = getLocalStorage('currentLang') as LangEnum
if (lastLang) {
  I18N.setLangHandle(lastLang)
} else {
  setLocalStorage('currentLang', I18N.currentLang)
}

export default I18N
