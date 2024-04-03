import langMap from '@/config/lang-map'

type LangMapType = typeof langMap

export type LangMapKeyType = keyof LangMapType

export const langKeys = Object.keys(langMap)

type LanguageType = {
  [key in LangMapKeyType]?: string
}

export const languageTypeMap: LanguageType = langKeys.reduce(
  (pre, curr) => ({
    ...pre,
    [curr]: curr,
  }),
  {},
)

export const languageOptions = langKeys.map(lang => ({
  value: lang,
  label: langMap[lang].zhName,
  disabled: lang === 'zh',
}))

export const languageZhNameMap = langKeys.reduce((pre, curr) => {
  return {
    ...pre,
    [curr]: {
      text: langMap[curr].zhName,
    },
  }
}, {})
