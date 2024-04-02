import type { CipherMode } from 'sm-crypto'
import { sm2 } from 'sm-crypto'

/**
 * 基于SM2的加密
 * @param str
 * @param publicKey
 * @param cipherMode
 */
export function encrypt(
  str: string | ArrayLike<number>,
  publicKey: string,
  cipherMode: CipherMode = 1,
) {
  return '04' + sm2.doEncrypt(str, publicKey, cipherMode)
}

type DecryptConfig = {
  cipherMode: CipherMode
  output: 'string' | 'array'
}

/**
 * 基于SM2的解密
 * @param encryptData
 * @param privateKey
 * @param config
 * @returns
 */
export function decrypt(
  encryptData: string,
  privateKey: string,
  config: DecryptConfig = { cipherMode: 1, output: 'string' },
) {
  const str = encryptData.startsWith('04') ? encryptData.slice(2) : encryptData
  return sm2.doDecrypt(str, privateKey, config.cipherMode, {
    output: config.output,
  })
}

/**
 * SM2生成公钥&私钥
 * @returns
 */
export function generateKeyPairHex() {
  let { privateKey, publicKey } = sm2.generateKeyPairHex()
  return {
    publicKey,
    privateKey,
  }
}
