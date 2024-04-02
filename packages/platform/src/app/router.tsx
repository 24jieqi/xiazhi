import pkgJSON from '@/../package.json'
import { Skeleton } from '@fruits-chain/react-bailu'
import { App } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import LOGO_IMAGE from '@/assets/images/logo.svg'
import type { ChunfenRouterConfig } from '@/chunfen'
import Chunfen, { buildAdminLayout } from '@/chunfen'
import useUser from '@/stores/user'
import { sleep } from '@/utils'

import HeaderRight from './components/header-right'
import useImportRoutes from './useImportRoutes'

import './style.less'

// /**
//  * 判断当前路由是否是general routes
//  * @param pathname
//  * @param routes
//  * @returns
//  */
// function checkCurrentLocationToBeGeneralRoutes(
//   pathname: string,
//   routes: ChunfenRouterConfig[],
// ) {
//   const matchedRoutes = matchRoutes(routes as any[], pathname) // null if not match
//   return !!matchedRoutes
// }

const AppRouter = () => {
  const { message } = App.useApp()
  const { generalRoutes, manageRoutes } = useImportRoutes()
  const [initialize, setInitialize] = useState(true)
  const requestAccess = useCallback(async () => {
    try {
      // tips
      const permissions = await sleep<string[]>(500, [])
      return permissions
    } catch (error) {
      if ((error as Error).message) {
        message.error((error as Error).message)
      }
      return []
    }
  }, [message])
  const routes = useMemo<ChunfenRouterConfig[]>(
    () => [
      ...generalRoutes,
      buildAdminLayout({
        requestAccess,
        path: '/admin',
        routes: manageRoutes,
        didMount() {
          useUser.getState().fetchUser()
        },
        logo: <img src={LOGO_IMAGE} alt={pkgJSON.appName} />,
        title: <span className="app-name">XX后台管理系统</span>,
        headerRight: <HeaderRight />,
        headerLeftExtra: null,
      }),
    ],
    [generalRoutes, manageRoutes, requestAccess],
  )
  /**
   * 路由初次加载时刷新token的逻辑 判断如下
   * 1. 刷新token，如果无token或者接口调用异常 抛出错误
   * 2. 判断当前路由是否是非权限（generalRoutes）路由，如果不是则跳转到登录页
   * 3. 处理完毕后，结束loading
   */
  useEffect(() => {
    useUser
      .getState()
      .refreshToken()
      .catch(() => {
        // if (
        //   !checkCurrentLocationToBeGeneralRoutes(
        //     location.pathname,
        //     generalRoutes,
        //   )
        // ) {
        //   navigateToLogin()
        // }
      })
      .finally(() => {
        setInitialize(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Skeleton.App loading={initialize} showHeader={false} showSidebar={false}>
      <Chunfen routes={routes} />
    </Skeleton.App>
  )
}

export default AppRouter
