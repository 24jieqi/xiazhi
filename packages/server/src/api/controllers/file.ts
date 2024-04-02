import type { Context } from 'koa'
import { response } from '@/utils/response'
import { serverAddress } from '../../constants'

export default class FileController {
  public static async upload(ctx: Context) {
    ctx.status = 200
    response(ctx, { data: `${serverAddress}/images/${ctx.file.filename}` })
  }
}
