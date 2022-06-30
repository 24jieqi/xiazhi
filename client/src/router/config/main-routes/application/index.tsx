import React from 'react'
import BlankLayout from '@/layouts/blank-layout'
import AppList from '@/pages/application/list'
import AppNewPage from '@/pages/application/add'
import AppEditPage from '@/pages/application/edit'
import AppDetail from '@/pages/application/detail'
import { CustomRouteConfig } from '../../index'
import { generateRelativePath } from '../../utils'
import { APP_DETAIL, NEW_APP, EDIT_APP, APP_MODULE_INDEX } from './path'

const routes: CustomRouteConfig = {
  path: APP_MODULE_INDEX,
  element: <BlankLayout />,
  children: [
    {
      path: generateRelativePath(APP_MODULE_INDEX, NEW_APP),
      element: <AppNewPage />,
    },
    {
      element: <AppList />,
      index: true,
    },
    {
      path: generateRelativePath(APP_MODULE_INDEX, EDIT_APP, 'id'),
      element: <AppEditPage />,
    },
    {
      path: generateRelativePath(APP_MODULE_INDEX, APP_DETAIL, 'id'),
      element: <AppDetail />,
    },
  ],
}

export default routes
