import fs from 'fs/promises'

import chalk from 'chalk'

import { handle, isAndEmpty, log, resolvePath } from '../../utils/common'
import { formatFileWithConfig } from '../../utils/format'

import { CONFIG_FILE_NAME, INIT_CONFIG } from './constant'
import type { ExtConfig } from './interface'
import { diffConfig } from './utils'

/**
 * 生成配置文件
 * @param override 是否覆盖生成
 */
export async function generateConfigFile(override = false) {
  try {
    await fs.access(resolvePath(CONFIG_FILE_NAME))
    if (!override) {
      log(chalk.yellow('[WARNING] 本地文件已存在，跳过生成'))
      return
    }
    await writeConfigFile()
    log(chalk.green('[INFO] 配置文件生成成功, 请修改后再次运行'))
  } catch (error) {
    await writeConfigFile()
    log(chalk.green('[INFO] 配置文件生成成功, 请修改后再次运行'))
  }
}

/**
 * 传入config 并且和默认config进行合并 输出合并后的结果 如果没有config 则返回null
 * @param config 传入的config
 * @returns
 */
export function getMergedConfig(config?: ExtConfig): ExtConfig | null {
  if (
    !config ||
    isAndEmpty(config, 'Object', value => Object.keys(value).length === 0)
  ) {
    return null
  }
  const diffResult = diffConfig(config)
  if (Object.keys(diffResult).length) {
    log(chalk.yellow('[WARNING] 以下配置项未设置，将会使用默认配置'))
    log(chalk.yellow(JSON.stringify(diffResult, null, 2)))
  }
  return {
    ...INIT_CONFIG,
    ...config,
  }
}

/**
 * 读取本地配置文件
 * @returns
 */
export async function readConfigFile() {
  const [data, error] = await handle<string>(
    fs.readFile(resolvePath(CONFIG_FILE_NAME), { encoding: 'utf-8' }),
  )
  if (error) {
    throw new Error(error.message || '读取配置文件失败')
  }
  return JSON.parse(data || '{}') as ExtConfig
}

/**
 * 写默认配置到文件
 */
export async function writeConfigFile() {
  await fs.writeFile(
    resolvePath(CONFIG_FILE_NAME),
    await formatFileWithConfig(
      JSON.stringify(INIT_CONFIG),
      undefined,
      'json-stringify',
    ),
  )
}

/**
 * 检查并返回配置，如果没有则写入默认配置到文件
 * 检查配置的流程：
 * 1. 如果传入了config，则直接使用config以及默认配置合并
 * 2. 读取本地文件配置 合并后返回
 * 3. 以默认配置生成配置文件并结束进程
 */
export async function checkConfig(config?: ExtConfig) {
  // 如果传入了配置 则返回后合并
  if (config) {
    return getMergedConfig(config)
  }
  // 读取本地文件合并后返回
  try {
    const localConfig = await readConfigFile()
    return getMergedConfig(localConfig)
  } catch (error) {
    log(
      chalk.yellow(
        `[WARNING] 读取配置文件失败，将生成默认配置文件：${error.message}`,
      ),
    )
  }
  // 以默认值生成配置文件并结束
  await generateConfigFile()
}
