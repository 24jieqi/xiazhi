import React, { PureComponent, useContext, createContext, Component } from 'react'
import { setLocalStorage } from '@/utils/storage'
import { LangEnum } from './typing'
import I18N, { Langs } from './index'

export interface I18NProps {
  I18N: Langs
  setLangTriggerRender: (lang: LangEnum) => void
}
export const I18NContext = createContext({
  I18N,
  setLangTriggerRender: (lang: LangEnum) => {},
})
export class I18NContextWrapper extends Component<
  {},
  {
    I18N: Langs
    setLangTriggerRender: (lang: LangEnum) => void
  }
> {
  public constructor(props) {
    super(props)
    this.state = {
      I18N,
      setLangTriggerRender: this.setLang,
    }
  }

  public setLang = (lang: LangEnum) => {
    if (lang === I18N.currentLang) {
      return
    }
    I18N.setLangHandle(lang)
    setLocalStorage('currentLang', lang)
    this.setState((state: any) => ({
      I18N: state.I18N,
    }))
  }

  public render() {
    return <I18NContext.Provider value={this.state}>{this.props.children}</I18NContext.Provider>
  }
}

export const I18NHOC: (...args) => any = WrappedComponent =>
  class WrapperComponent extends PureComponent {
    public render() {
      return (
        <I18NContext.Consumer>
          {({ I18N, setLangTriggerRender }) => <WrappedComponent I18N={I18N} setLangTriggerRender={setLangTriggerRender} {...this.props} />}
        </I18NContext.Consumer>
      )
    }
  }
// 简易版本，未测试的hooks
export const useI18n = () => {
  const context = useContext(I18NContext)
  return context
}
