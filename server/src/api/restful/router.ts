import Router from "@koa/router";
import {Methods, Route} from "./types";
import UploadController from "./controllers/UploadController";
import multer from '@koa/multer';
import fs from 'fs'

const storage = multer.diskStorage({
  destination(_, __, callback) {
    const dist = `${process.cwd()}/static/images`
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist)
    }
    callback(null, dist)
  },
  filename(_, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + file.originalname)
  },
})

const upload = multer({
  storage
});

const router = new Router();

const routes: Route[] = [
  {
    url: '/_upload',
    method: Methods.POST,
    handlers: [upload.single('file'), UploadController.upload]
  },
];

routes.forEach(({method, url, handlers}: Route) => {
  const handlerArr: any[] = Object.prototype.toString.call(handlers) === '[object Array]' ? handlers : [handlers]
  router[method](url, ...handlerArr);
});

router.get('/',)

export default router;

