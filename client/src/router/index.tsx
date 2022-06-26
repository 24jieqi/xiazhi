import usePermissionRoutes from '@/hooks/auth/usePermissionRoutes'
import routes, { noAuthRoutes } from './config'

const Routes = () => {
  const elements = usePermissionRoutes({ routes, noAuthRoutes })
  return elements
}

export default Routes
