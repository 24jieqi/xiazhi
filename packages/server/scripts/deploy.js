/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')

const shelljs = require('shelljs')

require('dotenv').config()

const isHttps = process.env.NETWORK_PROTOCAL === 'https'
shelljs.echo('--build start--')
// 安装依赖
shelljs.echo('--🚀1. install deps--')
shelljs.cd('../..')
shelljs.exec('yarn')
shelljs.echo('⭐️install deps done!')
// 构建服务端和平台客户端
shelljs.echo('--🚀2. build server and platform--')
shelljs.cd('./packages/server')
fs.rmSync('./dist', { recursive: true, force: true })
shelljs.exec('yarn build')
shelljs.cd('../platform')
shelljs.exec('yarn build:prod')
shelljs.echo('⭐️build completed')
shelljs.echo('--🚀3. move platform to server')
shelljs.cd('../server')
// 只有部署https时才拷贝证书信息
if (isHttps) {
  shelljs.cp('src/key.pem', 'dist/src/key.pem')
  shelljs.cp('src/cert.pem', 'dist/src/cert.pem')
}
// 创建或清理static目录
if (!shelljs.test('-e', './static')) {
  shelljs.mkdir('-p', './static')
} else {
  shelljs.rm('-rf', 'static/assets')
  shelljs.rm('-rf', 'static/index.html')
  shelljs.rm('-rf', 'static/manifest.json')
  shelljs.rm('-rf', 'static/*.png')
  shelljs.rm('-rf', 'static/*.png')
  shelljs.rm('-rf', 'static/*.ico')
  shelljs.rm('-rf', 'static/*.svg')
}
// 移动前端构建结果到server/static
shelljs.cd('../platform')
shelljs.mv('dist/*', '../server/static')
shelljs.echo('⭐️move completed')
// 启动服务
shelljs.cd('../server')
shelljs.echo('--🚀3. start server with pm2')
shelljs.exec('yarn prisma:deploy')
if (!shelljs.which('pm2')) {
  shelljs.echo('start server require pm2')
  shelljs.exit(1)
}
shelljs.exec('pm2 stop all')
shelljs.exec(`pm2 start dist/src/server.js`)
shelljs.echo('⭐️deploy completed')
