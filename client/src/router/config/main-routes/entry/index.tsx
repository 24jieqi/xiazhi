import React from 'react'
import BlankLayout from '@/layouts/blank-layout'
import EntryReadOnlyListPage from '@/pages/entry/list'
import { CustomRouteConfig } from '../../index'
import { generateRelativePath } from '../../utils'
import { ENTRY_MODULE_INDEX, ENTRY_LIST } from './path'

const routes: CustomRouteConfig = {
  path: ENTRY_MODULE_INDEX,
  element: <BlankLayout />,
  children: [
    {
      path: generateRelativePath(ENTRY_MODULE_INDEX, ENTRY_LIST, 'id'),
      element: <EntryReadOnlyListPage />,
    },
  ],
}

export default routes
