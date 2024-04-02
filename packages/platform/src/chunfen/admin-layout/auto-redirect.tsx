import { Skeleton } from '@fruits-chain/react-bailu'
import { App } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import type { MenuData } from '../interface'

import { useAdminRouteContext } from './admin-router-context'

const findFistMenu = (menus: MenuData[]): MenuData => {
  const menu = menus[0]
  if (menu.children?.length) {
    return findFistMenu(menu.children)
  }
  return menu
}

const AutoRedirect: React.FC = () => {
  const { message } = App.useApp()
  const { menuDatas } = useAdminRouteContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (menuDatas.length) {
      const firstMenu = findFistMenu(menuDatas)
      navigate(firstMenu.autoRedirect ?? firstMenu.key, {
        replace: true,
      })
    } else {
      message.warning('无可访问的菜单')
    }
  }, [menuDatas, navigate, message])

  return <Skeleton.App showHeader={false} showSidebar={false} loading />
}

export default AutoRedirect
