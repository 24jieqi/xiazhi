import type { AgnosticNonIndexRouteObject } from '@remix-run/router/dist/utils'
import { Menu, Layout } from 'antd'
import omit from 'lodash/omit'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useLocation, matchRoutes, Link } from 'react-router-dom'

import type { MenuData } from '../../interface'
import { useAdminRouteContext } from '../admin-router-context'

import './style.less'

type MenuItemData = Omit<MenuData, 'label' | 'children'> & {
  label: React.ReactNode
  children?: MenuItemData[]
}

const { Sider } = Layout

const replaceLabel = (m: MenuData) => {
  const _m: MenuItemData = {
    ...omit(m, ['autoRedirect']),
  }

  if (m.children?.length) {
    _m.children = m.children.map(replaceLabel)
  } else {
    _m.label = <Link to={_m.path}>{_m.label}</Link>
  }

  return _m
}

const SideMenu: React.FC<{ width: number }> = ({ width }) => {
  const { collapsed, menuDatas, routes } = useAdminRouteContext()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const menuDataLink = useMemo(() => {
    return menuDatas.map(replaceLabel)
  }, [menuDatas])
  useEffect(() => {
    const links = matchRoutes(
      routes as AgnosticNonIndexRouteObject[],
      location,
    )!
    const _openKeys: string[] = []
    const _selectedKeys: string[] = []
    /**
     * 遍历逻辑
     * 1. 找到第一个匹配的菜单树
     * 2. 遍历菜单树 如果有children则作为openKey加入，遍历其子节点 否则作为selectedKey加入
     */
    const findNode = (targetMenu: MenuData) => {
      if (!targetMenu) {
        return
      }
      if (targetMenu.children) {
        _openKeys.push(targetMenu.key)
        for (const child of targetMenu.children) {
          const isMatch = links.some(link => link.pathname === child.key)
          if (isMatch) {
            findNode(child)
          }
        }
      } else {
        _selectedKeys.push(targetMenu.key)
      }
    }
    if (links) {
      // 找到第一个全匹配的菜单树
      const targetMenu = menuDatas.find(item =>
        links.some(link => link.pathname === item.key),
      )
      findNode(targetMenu)
      setOpenKeys(s => [...s, ..._openKeys])
      setSelectedKeys(_selectedKeys)
    }
  }, [location, menuDatas, routes])
  return (
    <Sider trigger={null} collapsible width={width} collapsed={collapsed}>
      <Menu
        theme="light"
        mode="inline"
        className="chunfen-side-menu"
        items={menuDataLink}
        inlineIndent={16}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
      />
    </Sider>
  )
}

export default memo(SideMenu)
