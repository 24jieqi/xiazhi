import { ApolloProvider } from '@apollo/client'
import { Provider } from '@fruits-chain/react-bailu'
import type { Locale } from 'antd/es/locale'
import enUS from 'antd/locale/en_US'
import thTH from 'antd/locale/th_TH'
import viVN from 'antd/locale/vi_VN'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import 'dayjs/locale/th'
import 'dayjs/locale/vi'
import { locale } from 'dayjs'
import { memo } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Global from '@/constants/global'
import gqlClient from '@/graphql/client'
import { I18NContextWrapper, useI18n } from '@/i18n/context'
import { LangEnum } from '@/i18n/typing'

import NavigateSetter from './components/navigate-setter'
import AppRouter from './router'

const ANTD_LOCALE_MAP: Record<LangEnum, Locale> = {
  'en-US': enUS,
  'th-TH': thTH,
  'vi-VN': viVN,
  'zh-CN': zhCN,
}

const DAYJS_LOCALE_MAP: Record<LangEnum, string> = {
  [LangEnum.zhCN]: 'zh-cn',
  [LangEnum.enUS]: 'en',
  [LangEnum.viVN]: 'vi',
  [LangEnum.thTH]: 'th',
}

const ProviderInI18N: React.FC<React.PropsWithChildren> = memo(
  ({ children }) => {
    const { currentLang } = useI18n()
    locale(DAYJS_LOCALE_MAP[currentLang])
    return (
      <Provider locale={ANTD_LOCALE_MAP[currentLang]}>
        <Global />
        {children}
      </Provider>
    )
  },
)

function App() {
  return (
    <div className="app">
      <ApolloProvider client={gqlClient}>
        <I18NContextWrapper>
          <ProviderInI18N>
            <BrowserRouter>
              <NavigateSetter />
              <AppRouter />
            </BrowserRouter>
          </ProviderInI18N>
        </I18NContextWrapper>
      </ApolloProvider>
    </div>
  )
}

export default App
