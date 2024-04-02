import { isDef } from '@fruits-chain/utils'
import isNil from 'lodash/isNil'
import isUndefined from 'lodash/isUndefined'
import { cloneElement } from 'react'
import { Navigate } from 'react-router-dom'

import type { ChunfenRouterConfig, MenuData } from './interface'

export const findMenuDatas = (routes: ChunfenRouterConfig[]) => {
  const nodes: MenuData[] = []

  routes.forEach(({ hideInMenu, hideChildrenInMenu, ...item }) => {
    const hasChildren = !isNil(item.children) && !!item.children.length
    /**
     * 子菜单（初始化子路由path或原始路由配置有children）
     */
    const hasSubMenu =
      item.initialRoutePath ||
      (!item.initialRoutePath && item.originalChildren?.length)
    // 需要处理的路由判断条件：1）没有设置隐藏 2）设置了路由名称（因为要作为菜单展示）3）没有设置子路由或者设置了子路由但是至少有一个可访问的子路由
    if (
      !hideInMenu &&
      item.name &&
      (!hasSubMenu || (hasSubMenu && hasChildren))
    ) {
      // 获取最终确认的初始化子路由path：用户指定了initialRoutePath但是无权访问，则默认访问有权的第一个子路由
      const finalInitialRoutePath = item.initialRoutePath
        ? hasChildren &&
          item.children!.every(child => child.path !== item.initialRoutePath)
          ? item.children[0].path!
          : item.initialRoutePath
        : ''
      const node: MenuData = {
        label: item.name,
        key: item.path!,
        path: finalInitialRoutePath || item.path!, // 直接让菜单用上默认子路由的path，减少重定向带来的额外一次渲染
        icon: item.icon,
        autoRedirect: item.autoRedirect,
      }
      // 如果还有可访问的子路由，并且没有设置子菜单隐藏（继续递归）
      if (hasChildren && !hideChildrenInMenu) {
        const _children = findMenuDatas(item.children!)
        if (_children.length) {
          node.children = _children
        }
      }
      // 把节点加入到菜单数的条件：1）作为菜单项 2）把子菜单隐藏（需要作为菜单项展示，上层条件已经判断过有可访问的子路由）3）作为父级菜单
      if (!hasChildren || hideChildrenInMenu || !!node.children?.length) {
        nodes.push(node)
      }
    }
  })

  return nodes
}

export const filterRoute = (
  routes: ChunfenRouterConfig[],
  access: string[],
) => {
  const nodes: ChunfenRouterConfig[] = []

  routes.forEach(route => {
    const _access = Array.isArray(route.access) ? route.access : [route.access]
    if (
      isUndefined(route.access) ||
      _access.some(key => access.indexOf(key) > -1)
    ) {
      const _route: ChunfenRouterConfig = {
        ...route,
        children: [],
      }

      if (route.children?.length) {
        const filteredChildren = filterRoute(route.children, access)
        if (filteredChildren.length) {
          nodes.push({
            ...route,
            children: filteredChildren,
            originalChildren: route.children,
          })
        }
      } else {
        nodes.push(_route)
      }
    }
  })

  return nodes
}

/**
 * 格式化路由配置 添加默认渲染的子路由跳转/处理多层级路由element
 * @param routes
 * @returns
 */
export const formatRouterConfig = (routes: ChunfenRouterConfig[]) => {
  const nodes: ChunfenRouterConfig[] = []
  routes.forEach(route => {
    const _route: ChunfenRouterConfig = {
      ...route,
      children: [],
    }
    const hasChildren = !isNil(route.children) && !!route.children.length
    // 如果配置了子路由并且指定了当前路由的element，则该element被标注为layout注入children属性
    if (hasChildren && isDef(_route.element)) {
      _route.element = cloneElement(_route.element, {
        routes: route.children,
      })
    }
    if (!isNil(_route.initialRoutePath)) {
      _route.children?.push({
        index: true,
        element: <Navigate to={_route.initialRoutePath} replace />,
      })
    }
    if (hasChildren) {
      _route.children?.push(...formatRouterConfig(route.children!))
    }
    nodes.push(_route)
  })

  return nodes
}
