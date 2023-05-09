import {Context} from "koa";
import {response} from "../utils";
import { serverAddress } from "../../constants";

export default class UserController {
  static async upload(ctx: Context) {
    ctx.status = 200;
    serverAddress
    response(ctx, { data: `${serverAddress}/images/${ctx.file.filename}` })
  }
}
