import { Skeleton } from '@fruits-chain/react-bailu'
import type { LazyExoticComponent } from 'react'
import { Suspense } from 'react'

import type { ChunfenRouterConfig } from '@/chunfen'

export type BuildRouteConfigFunction<TITLE_TYPE = Record<string, any>> = (
  t?: TITLE_TYPE,
) => ChunfenRouterConfig[]

export const BASE_PATH = ''

export const buildRouteSuspense = (LazyRoute: LazyExoticComponent<any>) => {
  return (
    <Suspense
      fallback={
        <Skeleton.App showHeader={false} showSidebar={false} loading />
      }>
      <LazyRoute />
    </Suspense>
  )
}
