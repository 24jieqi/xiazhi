function getContextJsTemplate(isNative: boolean) {
  const effectArray: string[] = []
  if (isNative) {
    effectArray.push(`
      Storage.get(LANG_STORAGE_KEY).then((lang) => {
      if (lang) {
        i18n.setLang(lang)
      } else {
        Storage.set(LANG_STORAGE_KEY, i18n.currentLang)
      }
      forceUpdate({})
      })
    `)
  } else {
    effectArray.push(`
      const lang = Storage.get(LANG_STORAGE_KEY)
      if (lang) {
        i18n.setLang(lang)
      } else {
        Storage.set(LANG_STORAGE_KEY, i18n.currentLang)
      }
      forceUpdate({})
    `)
  }
  const contextTemplate = `
import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react'
import Storage from './storage'
import I18N from './index'

export const I18NContext = createContext({
  I18N,
  setLangTriggerRender: () => {},
})

export const LANG_STORAGE_KEY = 'currentLang'

export const I18NContextWrapper = ({ children }) => {
  const i18nIns = useRef(I18N)
  // eslint-disable-next-line no-unused-vars
  const [_, forceUpdate] = useState({})
  const i18n = i18nIns.current
  useEffect(() => {
    ${effectArray.join('')}
  }, [])
  function setLang(lang) {
    if (lang === i18n.currentLang) {
      return
    }
    i18n.setLangHandle(lang)
    Storage.set(LANG_STORAGE_KEY, lang)
    forceUpdate({})
  }
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <I18NContext.Provider value={{ setLangTriggerRender: setLang, I18N: i18n }}>
      {children}
    </I18NContext.Provider>
  )
}
export const useI18n = () => {
  return useContext(I18NContext)
}
`
  return contextTemplate
}
export default getContextJsTemplate
