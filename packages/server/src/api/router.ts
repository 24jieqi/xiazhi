import fs from 'fs'

import multer, { diskStorage } from '@koa/multer'
import Router from '@koa/router'

import { authMiddleWareRestful } from '@/middleware/auth'
import { Methods } from '@/types'
import type { Route } from '@/types'

import FileController from './controllers/file'
import UserController from './controllers/user'

const storage = diskStorage({
  destination(_, __, callback) {
    const dist = `${process.cwd()}/static/images`
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist, { recursive: true })
    }
    callback(null, dist)
  },
  filename(_, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + file.originalname)
  },
})

const upload = multer({
  storage,
})

const routes: Route[] = [
  {
    url: '/user',
    method: Methods.GET,
    handlers: [authMiddleWareRestful, UserController.getInfo],
  },
  {
    url: '/_upload',
    method: Methods.POST,
    handlers: [upload.single('file'), FileController.upload],
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
