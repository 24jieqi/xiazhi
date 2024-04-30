#!/usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'

import { log } from './utils/common'

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

program.name('ext-intl').description('夏至多语言脚本').version(pkgJson.version)

program
  .command('sync')
  .description(
    '运行此命令将会同步远程词条资源到本地，一般位于`src/i18n/entries.json`，该命令只会在在线模式下生效',
  )
  .action(async () => {
    const localConfig = await readConfigFile()
    const config = getMergedConfig(localConfig)
    await sync(config!.origin!, config!.accessKey!)
  })
program
  .command('start')
  .description(
    '开启一次多语言提取，流程为:\n1)检查本地配置，确定运行模式\n2)根据指定的目录开始遍历文件，提取中文并生成词条key\n3)写入key和更新本地词条文件\n4)如果有未匹配到的词条，在线模式下则可以上报到远程',
  )
  .action(async () => {
    // 1. 读取配置，如果没有 则会自动生成并结束
    const config = await checkConfig()
    if (!config) {
      return
    }
    if (!config.accessKey || !config.origin) {
      log(chalk.cyan('[INFO] 当前以离线模式运行'))
    }
    // 2. 如果配置了ak和url 则同步词条到本地
    if (config.accessKey && config.origin) {
      await sync(config.origin, config.accessKey)
    }
    // 3. 开始提取
    await start(config)
  })
program
  .command('update')
  .description('同步远程词条到本地并更新词条文件，适用于词条翻译有变更的情况')
  .action(async () => {
    const localConfig = await readConfigFile()
    const config = getMergedConfig(localConfig)
    const isSyncSuccess = await sync(config!.origin!, config!.accessKey!)
    if (isSyncSuccess) {
      await update(config!)
    }
  })
program
  .command('config')
  .description('生成本地配置文件')
  .option('-o, --override', '覆盖当前已经存在的配置文件')
  .action(async options => {
    await generateConfigFile(options.override)
  })

program.parse()
