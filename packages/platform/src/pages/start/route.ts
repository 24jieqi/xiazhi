import { lazy } from 'react'

import type { BuildRouteConfigFunction } from '@/utils/router'
import { BASE_PATH, buildRouteSuspense } from '@/utils/router'

export const START = `${BASE_PATH}/start`

const StartPage = buildRouteSuspense(lazy(() => import('@/pages/start/index')))

const buildRoute: BuildRouteConfigFunction = () => [
  {
    path: BASE_PATH,
    element: StartPage,
  },
]

export default buildRoute
