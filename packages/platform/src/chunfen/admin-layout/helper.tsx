import type { ChunfenRouterConfig, AdminLayoutProps } from '../interface'

import AdminLayout from './admin-layout'
import AutoRedirect from './auto-redirect'

export const buildAdminLayout = ({
  path,
  routes,
  ...rest
}: {
  path: string
  routes: ChunfenRouterConfig[]
} & AdminLayoutProps): ChunfenRouterConfig => {
  return {
    path: path,
    element: <AdminLayout {...rest} routes={routes} />,
    children: [
      {
        index: true,
        element: <AutoRedirect />,
      },
      ...routes,
    ],
  }
}
