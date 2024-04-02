import { lazy } from 'react'

import type { BuildRouteConfigFunction } from '@/utils/router'
import { BASE_PATH, buildRouteSuspense } from '@/utils/router'

export const APP_LIST = `${BASE_PATH}/app`

const AppListPage = buildRouteSuspense(
  lazy(() => import('@/pages/application/list')),
)

const buildRoute: BuildRouteConfigFunction = () => [
  {
    path: APP_LIST,
    element: AppListPage,
  },
]

export default buildRoute
