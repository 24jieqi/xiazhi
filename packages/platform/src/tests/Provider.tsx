import { MockedProvider } from '@apollo/client/testing'
import type { MockedResponse } from '@apollo/client/testing'
import { Provider } from '@fruits-chain/react-bailu'
import { App } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import type { ComponentType, PropsWithChildren } from 'react'
import React from 'react'
import { MemoryRouter, Route, Routes, BrowserRouter } from 'react-router-dom'
import 'dayjs/locale/zh-cn'

import commonMocks from './mocks'
interface TestProviderProps {
  customMock?: MockedResponse[]
}

/**
 * 基础组件测试
 * @param param0
 * @returns
 */
export const TestProvider: React.FC<PropsWithChildren<TestProviderProps>> = ({
  children,
  customMock = [],
}) => {
  return (
    <MockedProvider mocks={[...commonMocks, ...customMock]}>
      <Provider locale={zhCN}>
        <App>{children}</App>
      </Provider>
    </MockedProvider>
  )
}

interface MockedRouterProps<ComponentParams> extends TestProviderProps {
  Compoent: ComponentType<ComponentParams>
  initialParams?: ComponentParams
  /**
   * 见 MemoryRouter 的 initialEntries 一般用于路由传参
   */
  initialEntries?: Array<string | Partial<Location>>
}

/**
 * 页面级组件测试
 * @param param0
 * @returns
 */
export function MockedRouter<ComponentParams = unknown>({
  Compoent,
  customMock = [],
  initialParams,
  initialEntries = ['/'],
}: MockedRouterProps<ComponentParams>) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <TestProvider customMock={customMock}>
        <Routes>
          <Route path="/" index element={<Compoent {...initialParams} />} />
        </Routes>
      </TestProvider>
    </MemoryRouter>
  )
}

interface MockedRoutersProps extends TestProviderProps {
  routes: {
    path: string
    Compoent: ComponentType<unknown>
    params?: Record<string, unknown>
    index?: boolean
  }[]
}

/**
 * 多页面测试（路由跳转）
 * @param param0
 * @returns
 */
export function MockedRouters({ routes, customMock }: MockedRoutersProps) {
  return (
    <BrowserRouter>
      <TestProvider customMock={customMock}>
        <Routes>
          {routes.map(({ path, Compoent, params, index }) => (
            <Route
              path={path}
              key={path}
              index={!!index}
              element={<Compoent {...params} />}
            />
          ))}
        </Routes>
      </TestProvider>
    </BrowserRouter>
  )
}
