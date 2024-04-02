import type { PropsWithChildren} from 'react';
import React, { useCallback, useMemo , PureComponent, useContext, createContext } from 'react';

import { useCurrentLang } from './store';
import { LangEnum } from './typing'

import I18N from './index'

export interface I18NProps {
  currentLang: LangEnum
  setLangTriggerRender: (lang: LangEnum) => void
  I18N: typeof I18N
}
export const I18NContext = createContext<I18NProps>({ currentLang: LangEnum.zhCN, setLangTriggerRender: () => {}, I18N })

export const I18NContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { currentLang, setCurrentLang } = useCurrentLang()
  const setLangTriggerRender = useCallback((nextLang: LangEnum) => {
    if (nextLang === currentLang) {
      return
    }
    setCurrentLang(nextLang)
    I18N.setLang!(nextLang)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang])
  const value = useMemo(() => {
    return {
      currentLang,
      setLangTriggerRender,
      I18N
    }
  }, [currentLang, setLangTriggerRender])
  return <I18NContext.Provider value={value}>
    {children}
  </I18NContext.Provider>
}

export const I18NHOC = (WrappedComponent: React.ComponentType<Partial<I18NProps>>) =>
  class WrapperComponent extends PureComponent {
    public render() {
      return (
        <I18NContext.Consumer>
          {({ currentLang, setLangTriggerRender,  I18N: _I18N }) => <WrappedComponent I18N={_I18N} currentLang={currentLang} setLangTriggerRender={setLangTriggerRender} {...this.props} />}
        </I18NContext.Consumer>
      )
    }
  }

/**
 * 
 * @returns 
 */
export const useI18n = () => {
  const context = useContext(I18NContext)
  return context
}
