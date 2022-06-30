import React from 'react'
import loadable from '@loadable/component'
import { Navigate, RouteObject } from 'react-router-dom'
import Layouts from '@/layouts/common-layout/index'
import InitPage from '@/pages/others/redirect'
import NoDataPage from '@/pages/others/404'
import { REDIRECT } from './basePath'
import modules from './main-routes'

export interface CustomRouteConfig extends RouteObject {}

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
