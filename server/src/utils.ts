import os from "os";

/**
 * 获取ip地址
 * @returns
 */
export function getIpAddress() {
  var ifaces = os.networkInterfaces();
  try {
    for (const dev in ifaces) {
      let iface = ifaces[dev]!;
      for (let i = 0; i < iface.length; i++) {
        let { family, address, internal } = iface[i];
        if (family === "IPv4" && address !== "127.0.0.1" && !internal) {
          return address;
        }
      }
    }
  } catch (err) {
    return null;
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
  port: number
) {
  const protocal = https ? "https://" : "http://";
  return `${protocal}${ipAddress}:${port}`;
}
