import { Tabs } from 'antd'
import React, { useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAccess } from '@/chunfen'
import Breadcrumb from '@/chunfen/admin-layout/breadcrumb'
import Container from '@/chunfen/admin-layout/container'
import { filterRoute } from '@/chunfen/helper'
import type { ChunfenRouterConfig } from '@/chunfen/interface'

import styles from './style.module.less'

import type { ContainerLayoutProps } from './index'

type TabNavContainerProps = ContainerLayoutProps & {
  routes?: ChunfenRouterConfig[]
}

/**
 * Tab导航的布局容器，用于父路由`element`配置
 * @param param0
 * @returns
 */
const TabNavContainer: React.FC<TabNavContainerProps> = ({
  items,
  routes,
  scrollable,
  ...props
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { access } = useAccess()
  function handleTabNav(activeKey: string) {
    navigate(activeKey)
  }
  const tabItems = useMemo(() => {
    if (!routes) {
      return []
    }
    return filterRoute(routes, access).map(route => ({
      label: route.name,
      key: route.path,
    }))
  }, [routes, access])
  return (
    <>
      <Breadcrumb items={items} />
      {routes ? (
        <Tabs
          className={styles.tabBarNav}
          items={tabItems}
          activeKey={location.pathname}
          onTabClick={handleTabNav}
        />
      ) : null}
      <Container {...props} className={scrollable ? null : styles.container}>
        <Outlet />
      </Container>
    </>
  )
}

export default TabNavContainer
