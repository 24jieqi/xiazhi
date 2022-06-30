import React from 'react'
import Home from '@/pages/home'
import { CustomRouteConfig } from '../..'
import { HOME } from './path'

const routes: CustomRouteConfig = {
  path: HOME,
  element: <Home />,
}

export default routes
