import os from 'os'

/**
 * 获取ip地址
 * @returns
 */
export function getIpAddress() {
  const ifaces = os.networkInterfaces()
  try {
    const keys = Object.keys(ifaces)
    for (const key of keys) {
      let iface = ifaces[key]!
      for (const item of iface) {
        let { family, address, internal } = item
        if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
          return address
        }
      }
    }
  } catch (err) {
    return null
  }
}

/**
 * 获取服务器对外访问地址
 * @param https
 * @param ipAddress
 * @param port
 * @returns
 */
export function getServerAddress(
  https = false,
  ipAddress: string,
  port: number,
) {
  const protocal = https ? 'https://' : 'http://'
  return `${protocal}${ipAddress}:${port}`
}
