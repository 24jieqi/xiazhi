import { useRoutes } from 'react-router-dom'
import { useMemo } from 'react'
import { CustomRouteConfig } from '@/router/config'
import usePermissions from '@/stores/permissions'
import config from '@/config'
import { getRoutesWithPermissions } from '@/utils/route'

interface IPermissionRoutes {
  routes: CustomRouteConfig[]
  noAuthRoutes?: CustomRouteConfig[]
}

const usePermissionRoutes = ({ routes, noAuthRoutes }: IPermissionRoutes) => {
  const { permissions } = usePermissions()
  const authedRoutes = useMemo(() => {
    // 如果配置了不需要鉴权，则直接返回配置的路由
    if (!config.authorization) {
      return routes
    }
    if (!permissions || !permissions.length) {
      return noAuthRoutes
    }
    return getRoutesWithPermissions(routes, permissions)
  }, [permissions, routes, noAuthRoutes])
  return useRoutes(authedRoutes)
}

export default usePermissionRoutes
