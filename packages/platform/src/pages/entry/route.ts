import { lazy } from 'react'

import type { BuildRouteConfigFunction } from '@/utils/router'
import { BASE_PATH, buildRouteSuspense } from '@/utils/router'

export const ENTRY_LIST = `${BASE_PATH}/entry`

const EntryListPage = buildRouteSuspense(
  lazy(() => import('@/pages/entry/list')),
)

const buildRoute: BuildRouteConfigFunction = () => [
  {
    path: ENTRY_LIST,
    element: EntryListPage,
  },
]

export default buildRoute
