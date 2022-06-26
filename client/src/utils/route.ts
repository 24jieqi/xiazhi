import { matchPath } from 'react-router-dom'
import allRoutes, { CustomRouteConfig } from '@/router/config'
import usePermissions from '@/stores/permissions'

/**
 * 根据路由配置和权限数据获取菜单配置
 * @param routes 路由配置
 * @param authData 权限数据
 */
export const getMenuList = (
  routes: CustomRouteConfig[],
  authData: string[],
): CustomRouteConfig[] => {
  const menus =
    routes
      ?.filter(({ meta, authKey }) => {
        if (!meta?.isMenu) {
          return false
        }
        // 是菜单且有权限
        if (authKey === false || authData?.includes(authKey as string)) {
          return true
        }
        return false
      })
      .map(item => ({
        ...item,
        // 递归处理
        children: getMenuList(item.children, authData),
      })) || null
  return menus
}

/**
 * 根据路由配置
 * @param routes 路由配置
 */
export const getMenuListWithoutPermission = (
  routes: CustomRouteConfig[],
): CustomRouteConfig[] => {
  const menus =
    routes
      ?.filter(({ meta, authKey }) => {
        if (!meta?.isMenu) {
          return false
        }
        return true
      })
      .map(item => ({
        ...item,
        // 递归处理
        children: getMenuListWithoutPermission(item.children),
      })) || null
  return menus
}

/**
 * 从菜单中获取默认首页路由（第一个可选菜单项目）
 * @param menuList 菜单列表
 */
export const getHomepageUrl = (routes: CustomRouteConfig[], auth = true) => {
  const permissions = usePermissions.getState().permissions
  const menus = auth ? getMenuList(routes, permissions) : routes
  let firstMenu = menus[0]
  while (firstMenu.children && firstMenu.children.length > 0) {
    firstMenu = firstMenu.children[0]
  }
  return firstMenu.path
}
/**
 * 根据pathname匹配路由和菜单
 * @param pathname location.pathname
 * @returns 获取当前路由及菜单信息
 */
export const getCurrentRouteAndMenuInfo = (
  pathname: string,
): [CustomRouteConfig, CustomRouteConfig, string[]] => {
  let currentRoute: CustomRouteConfig = null
  let currentMenu: CustomRouteConfig = null
  let openKeys: string[] = []
  const traverse = (menu: CustomRouteConfig[]) => {
    for (let i = 0; i <= menu?.length - 1; i++) {
      const route = menu[i]
      /**
       * 当为默认路由时，因为与父级的路由一样，所以也匹配不到，直接跳过。
       */
      if (!route.path && route.index) {
        continue
      }
      const matchedRoute = matchPath(route.path, pathname)
      if (matchedRoute) {
        currentRoute = route
        if (route.meta?.title && route.meta?.isMenu) {
          currentMenu = route
        }
        return true
      } else {
        if (route.children?.length) {
          if (route.meta?.isMenu) {
            currentMenu = route
          }
          const subResult = traverse(route.children)
          // 如果子路由被匹配到
          if (subResult) {
            // 如果已获取到当前菜单项则将父菜单的title存储到openKeys
            if (currentMenu) {
              route.meta?.title && openKeys.push(route.meta.title)
            }
            // 如果尚未获取到当前菜单项，则判断当前路由是否有title，若有则将route设置为当前菜单项
            if (!currentMenu) {
              route.meta?.title && (currentMenu = route)
            }
            return true
          }
        }
      }
    }
    return false
  }
  traverse(allRoutes)
  return [currentRoute, currentMenu, openKeys]
}

/**
 * 获取权限情况下的路由配置
 * @param routes 静态路由配置
 * @param permissions 当前用户的权限列表
 */
export function getRoutesWithPermissions(
  routes: CustomRouteConfig[],
  permissions: string[],
) {
  if (!routes.length || !permissions.length) {
    return []
  }
  const result = []
  function routesLoop(routeWithSubRoute: CustomRouteConfig) {
    const temp = []
    for (const currentRoute of routeWithSubRoute.children) {
      // 如果当前路由是模糊匹配路由/有权限/不需要权限
      if (
        (currentRoute.authKey && permissions.includes(currentRoute.authKey)) ||
        currentRoute.path === '*' ||
        currentRoute.authKey === false
      ) {
        if (currentRoute.children && currentRoute.children.length > 0) {
          const node = routesLoop(currentRoute)
          if (node) {
            temp.push(node)
          }
        } else {
          temp.push(currentRoute)
        }
      }
    }
    // 叶节点有值
    if (temp.length) {
      return {
        ...routeWithSubRoute,
        children: temp,
      }
    }
    // 叶节点无可用值
    return null
  }
  // 遍历一级节点
  for (const route of routes) {
    if (route.children) {
      const temp = routesLoop(route)
      if (temp) {
        result.push(temp)
      }
    } else {
      result.push(route)
    }
  }
  return result
}
