import { useMemoizedFn } from 'ahooks'
import isBoolean from 'lodash/isBoolean'
import React, { createContext, useContext, useMemo, useState } from 'react'

import { findMenuDatas, filterRoute } from '../helper'
import type { AdminRouterContextState, ChunfenRouterConfig } from '../interface'

import { useAccess } from './access-context'

export const AdminRouteContext = createContext<AdminRouterContextState>({
  toggleCollapsed: () => {},
  collapsed: false,
  routes: [],
  menuDatas: [],
})

export const useAdminRouteContext = () => useContext(AdminRouteContext)

export const AdminRouterProvider: React.FC<
  React.PropsWithChildren<{
    routes: ChunfenRouterConfig[]
  }>
> = ({ children, routes }) => {
  const { access } = useAccess()
  const [collapsed, setCollapsed] = useState(false)
  const menuDatas = useMemo(
    () => findMenuDatas(filterRoute(routes, access)),
    [access, routes],
  )
  const toggleCollapsed = useMemoizedFn((v?: boolean) => {
    if (isBoolean(v)) {
      setCollapsed(v)
    } else {
      setCollapsed(c => !c)
    }
  })

  const value = useMemo<AdminRouterContextState>(() => {
    return {
      collapsed,
      toggleCollapsed,
      routes,
      menuDatas,
    }
  }, [collapsed, menuDatas, routes, toggleCollapsed])

  return (
    <AdminRouteContext.Provider value={value}>
      {children}
    </AdminRouteContext.Provider>
  )
}
