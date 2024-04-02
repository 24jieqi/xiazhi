import {
  BASE_PATH,
  type BuildRouteConfigFunction,
  buildRouteSuspense,
} from './utils'

type RouteConfig<TITLE_TYPE = Record<string, any>> = {
  /**
   * 路由在菜单中显示的顺序
   */
  sort: number
  buildRouteFn: BuildRouteConfigFunction<TITLE_TYPE>
}

export {
  BASE_PATH,
  BuildRouteConfigFunction,
  buildRouteSuspense,
  type RouteConfig,
}
