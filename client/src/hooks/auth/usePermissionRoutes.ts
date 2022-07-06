import { useRoutes } from 'react-router-dom'
import { useMemo } from 'react'
import { CustomRouteConfig } from '@/router/config'
import usePermissions from '@/stores/permissions'
import config from '@/config'

interface IPermissionRoutes {
  routes: CustomRouteConfig[]
  noAuthRoutes?: CustomRouteConfig[]
}

const usePermissionRoutes = ({ routes, noAuthRoutes }: IPermissionRoutes) => {
  const { permissions, token } = usePermissions()
  const authedRoutes = useMemo(() => {
    // 如果配置了不需要鉴权，则直接返回配置的路由
    if (!config.authorization && token) {
      return routes
    }
    if (!permissions || !permissions.length || !token) {
      return noAuthRoutes
    }
  }, [permissions, routes, noAuthRoutes, token])
  return useRoutes(authedRoutes)
}

export default usePermissionRoutes
