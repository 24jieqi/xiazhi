import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import zhCN from 'antd/lib/locale/zh_CN'
import Routes from './router'
import gqlClient from './graphql/client'
import 'dayjs/locale/zh-cn'
import 'moment/dist/locale/zh-cn'
import { I18NContextWrapper } from './i18n/context'
import './App.css'

function App() {
  return (
    <div className="App">
      <ApolloProvider client={gqlClient}>
        <ConfigProvider locale={zhCN}>
          <I18NContextWrapper>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </I18NContextWrapper>
        </ConfigProvider>
      </ApolloProvider>
    </div>
  )
}

export default App
