import Router from '@koa/router'

import { authMiddleWareRestful } from '@/middleware/auth'
import { Methods } from '@/types'
import type { Route } from '@/types'

import UserController from './controllers/user'

const routes: Route[] = [
  {
    url: '/user',
    method: Methods.GET,
    handlers: [authMiddleWareRestful, UserController.getInfo],
  },
]

const router = new Router()

routes.forEach(({ method, url, handlers }: Route) => {
  const handlerArr: any[] =
    Object.prototype.toString.call(handlers) === '[object Array]'
      ? handlers
      : [handlers]
  router[method](url, ...handlerArr)
})

export default router
