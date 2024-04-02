import { Layout } from '@fruits-chain/react-bailu'
import type { AgnosticNonIndexRouteObject } from '@remix-run/router/dist/utils'
import { Breadcrumb as BreadcrumbAntd } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import React, { memo, useMemo } from 'react'
import { Link, useLocation, matchRoutes } from 'react-router-dom'

import type { ChunfenRouterConfig, BreadcrumbProps } from '../interface'

import { useAdminRouteContext } from './admin-router-context'

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, ...props }) => {
  const location = useLocation()
  const { routes } = useAdminRouteContext()
  const links: ItemType[] = useMemo(() => {
    const menu = matchRoutes(routes as AgnosticNonIndexRouteObject[], location)!
      .map(item => {
        const { name, path, hideInBreadcrumb } =
          item.route as ChunfenRouterConfig

        return {
          name,
          path,
          hideInBreadcrumb,
        }
      })
      .filter(item => !!item.name && !!item.path && !item.hideInBreadcrumb)
    return menu.map<ItemType>((item, index) => ({
      key: item.path,
      title:
        index === 0 || index === menu.length - 1 ? (
          item.name
        ) : (
          <Link to={item.path!}>{item.name}</Link>
        ),
    }))
  }, [location, routes])

  return (
    <Layout.Breadcrumb>
      <BreadcrumbAntd {...props} items={items ?? links} />
    </Layout.Breadcrumb>
  )
}

export default memo(Breadcrumb)
