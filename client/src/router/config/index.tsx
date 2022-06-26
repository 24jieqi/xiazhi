/*
 * @Author: your name
 * @Date: 2021-12-31 11:17:51
 * @LastEditTime: 2021-12-31 11:22:22
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /web-template/src/router/config/index.tsx
 */
import React, { CSSProperties } from 'react'
import loadable from '@loadable/component'
import * as Icons from '@ant-design/icons/lib/icons'
import { RouteProps, Navigate } from 'react-router-dom'
import Layouts from '@/layouts/common-layout/index'
import { BreadcrumbItem } from '@/layouts/common-layout/components/breadcrumb'
import InitPage from '@/pages/others/redirect'
import NoDataPage from '@/pages/others/404'
import { REDIRECT } from './basePath'
import modules from './main-routes'

export interface CustomRouteConfig extends RouteProps {
  /** 面包屑配置 */
  breadcrumb?: BreadcrumbItem[]
  /** 权限 */
  authKey?: string | false
  /** 页面信息配置 */
  meta?: {
    /** 系统左侧菜单栏文案（为空或未配置则不会出现在菜单栏） */
    title?: string
    /** 菜单按钮 */
    icon?: keyof typeof Icons
    /** 主内容区域padding（默认16px） */
    contentPadding?: CSSProperties['padding']
    /** 是否作为菜单项 */
    isMenu?: boolean
  }
  /** 子路由 */
  children?: CustomRouteConfig[]
}

export const mainRoutes: CustomRouteConfig[] = [
  ...modules,
  { path: '', element: <Navigate to={REDIRECT} /> }, // 默认匹配的页面
]

const LoginComp = loadable(() => import('@/pages/others/login'))

const commonRoutes: CustomRouteConfig[] = [
  {
    path: '/login',
    element: <LoginComp />,
  },
  {
    path: REDIRECT,
    element: <InitPage />,
  },
]

// 未登录前使用的路由
export const noAuthRoutes: CustomRouteConfig[] = [
  ...commonRoutes,
  {
    path: '*',
    element: <Navigate to={REDIRECT} />,
  },
]
// 登录后或者鉴权过后使用的静态路由（实际可能只使用部分路由）/ 不需要权限时使用的路由
const routes: CustomRouteConfig[] = [
  ...commonRoutes,
  {
    path: '/',
    element: <Layouts />,
    children: [...mainRoutes],
  },
  { path: '*', element: <NoDataPage /> },
]

export default routes
