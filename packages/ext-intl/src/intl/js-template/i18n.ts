function getI18nJsTemplateString(langs: string[]) {
  const langMapStringList = ['const langs = {\n']
  const importLines = ["import kiwiIntl from 'kiwi-intl';\n"]
  for (const lang of langs) {
    const langName = lang.toUpperCase()
    importLines.push(`import ${langName} from './langs/${lang}';\n`)
    langMapStringList.push(`${lang}: ${langName},\n`)
  }
  langMapStringList.push('};\n')
  const returnd = `
    ${importLines.join('')}
    ${langMapStringList.join('')}
    const I18N = kiwiIntl.init('zh', langs)
    I18N.currentLang = 'zh'
    I18N.setLangHandle = (lang) => {
      I18N.currentLang = lang
      I18N.setLang(lang)
    }
    export default I18N
  `
  return returnd
}

export default getI18nJsTemplateString
