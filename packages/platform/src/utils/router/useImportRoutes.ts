import { useMemo } from 'react'

import type { BuildRouteConfigFunction } from './utils'

/**
 * @param menuData
 * @description 不能作为公共hooks导出，因为`import.meta.glob`会在vite构建过程中执行
 * @returns
 */
const useImportRoutes = <DataType = Record<string, any>>(
  menuData: DataType,
) => {
  const generalRoutes = useMemo(() => {
    const modules = import.meta.glob(
      ['../pages/**/route.ts', '../pages/**/route.tsx'],
      {
        eager: true,
        import: 'default',
      },
    )
    const keys = Object.keys(modules)
    const routes = keys.map(
      key => modules[key],
    ) as BuildRouteConfigFunction<DataType>[]
    return routes.map(fn => fn(menuData)).flat()
  }, [menuData])
  const manageRoutes = useMemo(() => {
    const modules = import.meta.glob(
      ['../pages/**/route.access.ts', '../pages/**/route.access.tsx'],
      {
        eager: true,
        import: 'default',
      },
    )
    const keys = Object.keys(modules)
    const routes = keys.map(
      key => modules[key],
    ) as BuildRouteConfigFunction<DataType>[]
    return routes.map(fn => fn(menuData)).flat()
  }, [menuData])
  return {
    generalRoutes,
    manageRoutes,
  }
}

export default useImportRoutes
