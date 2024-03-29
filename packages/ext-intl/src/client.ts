#!/usr/bin/env node

import { Command } from 'commander'

import {
  sync,
  update,
  getMergedConfig,
  generateConfigFile,
  readConfigFile,
  checkConfig,
  start,
} from '.'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkgJson = require('../package.json')

const program = new Command()

program
  .name('ext-intl')
  .description('xiazhi多语言脚本')
  .version(pkgJson.version)

program
  .command('sync')
  .description('同步远程词库数据')
  .action(async () => {
    const localConfig = await readConfigFile()
    const config = getMergedConfig(localConfig)
    await sync(config!.origin!, config!.accessKey!)
  })
program
  .command('start')
  .description('开启一次完整的多语言提取')
  .action(async () => {
    // 1. 读取配置，如果没有 则会自动生成并结束
    const config = await checkConfig()
    // 2. 如果配置了ak和url 则同步词条到本地
    if (config!.accessKey && config!.origin) {
      await sync(config!.origin, config!.accessKey)
    }
    // 3. 开始提取
    await start(config!)
  })
program
  .command('update')
  .description('同步远程词库数据并更新本地词条')
  .action(async () => {
    const localConfig = await readConfigFile()
    const config = getMergedConfig(localConfig)
    const isSyncSuccess = await sync(config!.origin!, config!.accessKey!)
    if (isSyncSuccess) {
      await update(config!.langs![0])
    }
  })
program
  .command('config')
  .description('配置脚本')
  .option('-o, --override', '覆盖当前已经存在的配置')
  .action(async options => {
    await generateConfigFile(options.override)
  })

program.parse()
