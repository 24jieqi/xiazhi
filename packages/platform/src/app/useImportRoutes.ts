import { useMemo } from 'react'

import { useI18n } from '@/i18n/context'
import type { BuildRouteConfigFunction, RouteConfig } from '@/utils/router'

const useImportRoutes = () => {
  const { I18N } = useI18n()
  const generalRoutes = useMemo(() => {
    const modules = import.meta.glob(
      ['../pages/**/route.ts', '../pages/**/route.tsx'],
      {
        eager: true,
        import: 'default',
      },
    )
    const keys = Object.keys(modules)
    const routes = keys.map(key => modules[key]) as BuildRouteConfigFunction[]
    return routes.map(fn => fn(I18N.menu)).flat()
  }, [I18N.menu])
  const manageRoutes = useMemo(() => {
    const modules = import.meta.glob(
      ['../pages/**/route.access.ts', '../pages/**/route.access.tsx'],
      {
        eager: true,
        import: 'default',
      },
    )
    const keys = Object.keys(modules)
    const routes = keys.map(key => modules[key]) as RouteConfig[]
    routes.sort((a, b) => a.sort - b.sort)
    return routes.map(({ buildRouteFn }) => buildRouteFn(I18N.menu)).flat()
  }, [I18N.menu])
  return {
    generalRoutes,
    manageRoutes,
  }
}

export default useImportRoutes
