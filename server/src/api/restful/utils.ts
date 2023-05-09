import { Response } from './types';
import {Context} from "koa";

const initialResponse: Response = {
  code: 200,
  msg: '',
  data: null
}
export const response = (ctx: Context, { code, msg, data }: Response = initialResponse) => {
  ctx.body = {
    code,
    msg,
    data
  };
}
