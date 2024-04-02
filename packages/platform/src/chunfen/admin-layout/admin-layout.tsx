import { Skeleton, ErrorBoundary } from '@fruits-chain/react-bailu'
import type { AgnosticNonIndexRouteObject } from '@remix-run/router/dist/utils'
import { useMemoizedFn } from 'ahooks'
import { Layout } from 'antd'
import isBoolean from 'lodash/isBoolean'
import isObject from 'lodash/isObject'
import isUndefined from 'lodash/isUndefined'
import noop from 'lodash/noop'
import React, { useEffect, useMemo } from 'react'
import { Outlet, useLocation, matchRoutes } from 'react-router-dom'

import type { AdminLayoutProps, ChunfenRouterConfig } from '../interface'
import Result from '../result'

import { useAccess, AccessProvider } from './access-context'
import {
  AdminRouterProvider,
  useAdminRouteContext,
} from './admin-router-context'
import Header from './header'
import SideMenu from './side-menu'

import './admin-layout.style.less'

const AdminLayout: React.FC<Omit<AdminLayoutProps, 'requestAccess'>> = ({
  sideWidth = 208,
  title,
  titleLink,
  logo,
  headerRight,
  headerLeftExtra,
  LoadingComponent = Skeleton.App,
  showCollapse = true,
  didMount,
  willUnmount,
}) => {
  const { hasAccess, loading: loadingAccess } = useAccess()
  const { routes } = useAdminRouteContext()
  const location = useLocation()
  const currentMatchRoutes = useMemo(
    () => matchRoutes(routes as AgnosticNonIndexRouteObject[], location) || [],
    [location, routes],
  )
  const didMountMemo = useMemoizedFn(didMount || noop)
  const willUnmountMemo = useMemoizedFn(willUnmount || noop)
  const authorization = useMemo(() => {
    if (currentMatchRoutes.length) {
      const route = currentMatchRoutes[currentMatchRoutes.length - 1]
        .route as ChunfenRouterConfig

      if (!isUndefined(route.access)) {
        return hasAccess(route.access)
      }
    }

    return true
  }, [currentMatchRoutes, hasAccess])
  const [showHeader, showSidebar] = useMemo<[boolean, boolean]>(() => {
    const currentMatchRoute = currentMatchRoutes[currentMatchRoutes.length - 1]
    const currentRoute = currentMatchRoute?.route as ChunfenRouterConfig

    if (isBoolean(currentRoute?.layout) && !currentRoute.layout) {
      return [false, false]
    }

    if (isObject(currentRoute?.layout)) {
      return [
        isBoolean(currentRoute?.layout.showHeader)
          ? currentRoute?.layout.showHeader
          : true,
        isBoolean(currentRoute?.layout.showSidebar)
          ? currentRoute?.layout.showSidebar
          : true,
      ]
    }

    return [true, true]
  }, [currentMatchRoutes])
  useEffect(() => {
    didMountMemo()
    return () => {
      willUnmountMemo()
    }
  }, [didMountMemo, willUnmountMemo])
  const contentJSX = (
    <ErrorBoundary>
      {authorization ? (
        <Outlet />
      ) : (
        <Result status="403" text="哎呀，出错了！无权访问..." />
      )}
    </ErrorBoundary>
  )
  const headerJSX = (
    <Header
      title={title}
      logo={logo}
      headerRight={headerRight}
      headerLeftExtra={headerLeftExtra}
      titleLink={titleLink}
      showCollapse={showCollapse}
    />
  )
  const sideJSX = <SideMenu width={sideWidth} />

  const render = () => {
    if (!showHeader && !showSidebar) {
      return contentJSX
    }

    if (!showHeader && showSidebar) {
      return (
        <Layout className="chunfen-root-layout">
          {sideJSX}
          <Layout>{contentJSX}</Layout>
        </Layout>
      )
    }

    if (showHeader && !showSidebar) {
      return (
        <Layout className="chunfen-root-layout">
          {headerJSX}
          <Layout>
            <Layout>{contentJSX}</Layout>
          </Layout>
        </Layout>
      )
    }

    return (
      <Layout className="chunfen-root-layout">
        {headerJSX}
        <Layout>
          {sideJSX}
          <Layout>{contentJSX}</Layout>
        </Layout>
      </Layout>
    )
  }

  return <LoadingComponent loading={loadingAccess}>{render()}</LoadingComponent>
}

const AdminLayoutWrapper: React.FC<
  AdminLayoutProps & {
    /**
     * 路由配置
     */
    routes: ChunfenRouterConfig[]
  }
> = ({ routes, requestAccess, ...props }) => {
  return (
    <AccessProvider requestAccess={requestAccess}>
      <AdminRouterProvider routes={routes}>
        <AdminLayout {...props} />
      </AdminRouterProvider>
    </AccessProvider>
  )
}

export default AdminLayoutWrapper
