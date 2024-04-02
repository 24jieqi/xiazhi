import type { IntlFormat } from 'kiwi-intl'
import kiwiIntl from 'kiwi-intl'

import enUsLangs from './langs/en-US'
import thTHLangs from './langs/th-TH'
import viVNLangs from './langs/vi-VN'
import zhCNLangs from './langs/zh-CN'
import { currentLangStore } from './store'
import { LangEnum } from './typing'

export const langsMap = {
  [LangEnum.zhCN]: zhCNLangs,
  [LangEnum.enUS]: enUsLangs,
  [LangEnum.thTH]: thTHLangs,
  [LangEnum.viVN]: viVNLangs,
}

const ins: typeof IntlFormat = {
  /**
   * 重写init，记录初始化lang
   * @param lang 
   * @param metas 
   * @param defaultKey 
   * @returns 
   */
  init(lang, metas, defaultKey) {
    currentLangStore.setState({ currentLang: lang as LangEnum })
    return kiwiIntl.init(lang, metas, defaultKey)
  },
}

// 初始化
const I18N = ins.init(currentLangStore.getState().currentLang, langsMap)

export type Langs = typeof zhCNLangs

export default I18N
