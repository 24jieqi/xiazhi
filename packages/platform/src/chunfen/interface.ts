import type { ContentProps } from '@fruits-chain/react-bailu/es/layout/interface'
import type { BreadcrumbProps as BreadcrumbAntdProps } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import type React from 'react'
import type { ReactElement } from 'react'
import type { RouteProps } from 'react-router-dom'

export interface BreadcrumbProps extends BreadcrumbAntdProps {}

export interface ContainerProps extends ContentProps {}

export interface PageContainerProps extends ContainerProps {
  items?: ItemType[]
}

export interface ChunfenRouterConfig extends Omit<RouteProps, 'children'> {
  /**
   * 自动重定向时，用于替换 path
   */
  autoRedirect?: string

  /**
   * 默认子路由路径
   */
  initialRoutePath?: string

  /**
   * 子路由
   */
  children?: ChunfenRouterConfig[]
  /**
   * 原始子路由配置（无需配置）
   */
  originalChildren?: ChunfenRouterConfig[]

  /**
   * 菜单的名字
   */
  name?: string

  /**
   * 路由权限
   */
  access?: string | string[]

  /**
   * 在面包屑导航中隐藏（一般用在默认路由）
   */
  hideInBreadcrumb?: boolean

  /**
   * 在菜单中隐藏子节点
   */
  hideChildrenInMenu?: boolean

  /**
   * 在菜单中隐藏自己和子节点
   */
  hideInMenu?: boolean

  /**
   * 菜单的icon
   */
  icon?: React.ReactNode
  /**
   * 路由所渲染的内容，这里覆盖为`ReactElement`类型，如果是子路由布局，则可以通过`routes`获取子路由的配置
   */
  element?: ReactElement<{ routes?: ChunfenRouterConfig[] }>
  /**
   * AdminLayout 页面布局
   * @default true
   */
  layout?:
    | boolean
    | {
        /**
         * 显示头部
         * @default true
         */
        showHeader?: boolean

        /**
         * 显示侧边栏
         * @default true
         */
        showSidebar?: boolean
      }
}

export interface ChunfenProps {
  /**
   * 路由配置
   */
  routes: ChunfenRouterConfig[]
}

export interface AdminLayoutProps {
  /**
   * 获取权限
   */
  requestAccess?: () => Promise<string[]>
  /**
   * 组件初始化时的回调
   */
  didMount?: () => void

  /**
   * 组件卸载前的回调
   */
  willUnmount?: () => void

  /**
   * layout 的左上角 logo
   */
  logo?: React.ReactNode

  /**
   * layout 的左上角 的 title
   */
  title?: React.ReactNode

  /**
   * 点击 title 跳转链接
   */
  titleLink?: string

  headerRight?: React.ReactNode
  /**
   * 左侧自定义扩展
   */
  headerLeftExtra?: React.ReactNode

  /**
   * 菜单宽
   * @default 208
   */
  sideWidth?: number

  LoadingComponent?: React.ComponentType<
    React.PropsWithChildren<{ loading?: boolean }>
  >

  /**
   * 是否显示菜单收展图标
   * @default true
   */
  showCollapse?: boolean
}

export interface MenuData {
  label: string
  icon?: React.ReactNode
  /**
   * 用做menu的唯一标识，一般为当前menu绑定的路由
   */
  key: string
  /**
   * MenuItem 渲染时Link指向的路由path
   */
  path: string
  autoRedirect?: string
  children?: MenuData[]
}

export interface AdminRouterContextState {
  toggleCollapsed: (collapsed?: boolean) => void
  collapsed: boolean
  routes: ChunfenRouterConfig[]
  menuDatas: MenuData[]
}

export interface AccessContextState {
  loading: boolean
  access: string[]
  setAccess: (access: string[]) => void
  hasAccess: (access: string | string[]) => boolean
  updateAccess: (quietness?: boolean) => Promise<void>
}
