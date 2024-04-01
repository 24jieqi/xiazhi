import { verify, sign } from 'jsonwebtoken'
import type Koa from 'koa'

import { SECRET_KEY } from '@/constants'

export interface DecodedPayload {
  userId: number
}

/**
 * 解析token
 * @param req
 * @param requireAuth
 * @returns
 */
function decodedToken(req: Koa.ParameterizedContext) {
  const authorization = req.headers.authorization
  if (authorization) {
    try {
      const token = authorization.replace('Bearer ', '')
      const decoded = verify(token, SECRET_KEY) as unknown as DecodedPayload
      return decoded
    } catch {}
  }
}

/**
 * 生成token
 * @param userId
 * @returns
 */
function generateToken(userId: number, expiresIn = '24h') {
  return sign(
    {
      userId,
    },
    SECRET_KEY,
    {
      expiresIn,
    },
  )
}

export { decodedToken, generateToken }
