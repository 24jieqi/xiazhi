import React from 'react'
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons'
import { HOME } from '@/router/config/main-routes/home/path'
import { APP_MODULE_INDEX } from '@/router/config/main-routes/application/path'

export default {
  route: {
    path: '/',
    routes: [
      {
        path: HOME,
        name: '首页',
        icon: <HomeOutlined />,
      },
      {
        path: APP_MODULE_INDEX,
        name: '应用管理',
        icon: <AppstoreOutlined />,
      },
    ],
  },
  location: {
    pathname: '/',
  },
}
