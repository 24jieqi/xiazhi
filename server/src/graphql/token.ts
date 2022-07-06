import jwt from "jsonwebtoken";
import Koa from "koa";

const SECRET_KEY = "fafamnx!!2d**8z";

export interface DecodedPayload {
  userId: number;
}

/**
 * 解析token
 * @param req
 * @param requireAuth
 * @returns
 */
function decodedToken(req: Koa.ParameterizedContext, requireAuth = true) {
  const authorization = req.headers.authorization;
  if (authorization) {
    try {
      const token = authorization.replace("Bearer ", "");
      const decoded = jwt.verify(
        token,
        SECRET_KEY
      ) as unknown as DecodedPayload;
      return decoded;
    } catch (error) {
      throw new Error("[401]Login expired");
    }
  }
  if (requireAuth) {
    throw new Error("[401]Authentication required");
  }
  return null;
}

/**
 * 生成token
 * @param userId
 * @returns
 */
function generateToken(userId: number) {
  return jwt.sign(
    {
      userId,
    },
    SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
}

export { decodedToken, generateToken };
