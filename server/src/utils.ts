import os from 'os'

/**
 * 获取ip地址
 * @returns 
 */
export function getIpAddress() {
  var ifaces=os.networkInterfaces()
  console.log('ifaces', ifaces)
  try {
    for (const dev in ifaces) {
      let iface = ifaces[dev]!
      for (let i = 0; i < iface.length; i++) {
        let {family, address, internal} = iface[i]
        if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
          return address
        }
      }
    }
  } catch(err) {
    return null
  }
}