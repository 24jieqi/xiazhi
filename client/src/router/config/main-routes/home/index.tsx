import React from 'react'
import Home from '@/pages/home'
import { CustomRouteConfig } from '../..'
import { HOME } from './path'

const routes: CustomRouteConfig = {
  path: HOME,
  element: <Home />,
  authKey: false,
  meta: {
    title: 'home',
    icon: 'DashboardOutlined',
    isMenu: true,
  },
  breadcrumb: [{ name: 'home' }],
}

export default routes
