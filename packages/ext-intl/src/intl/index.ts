import * as ChildProcess from 'child_process'
import * as fs from 'fs'
import * as promiseFs from 'fs/promises'

import * as chalk from 'chalk'

import type { ExtConfig } from '../commands/config/interface'
import { APP_DEPENDENCIES, WEB_DEPENDENCIES, outputPath } from '../constant'
import type { DependenciesType } from '../interface'
import { isNative, log, resolvePath } from '../utils/common'
import { formatFileWithConfig } from '../utils/format'

import appStorageTemplate from './app-storage'
import getContextTemplate from './context'
import getI18nTemplateString from './i18n'
import getTypingTemplateString from './typing'
import webStorageTemplate from './web-storage'
/**
 * 写入i18n模版文件
 */
async function writeI18nTemplateFile() {
  const { langs } = global['intlConfig'] as ExtConfig
  const native = isNative()

  // 获取模板文件内容
  const i18nStr = getI18nTemplateString(langs!)
  const typingStr = getTypingTemplateString(langs!)
  const contextStr = getContextTemplate(native)
  const storageTemplate = native ? appStorageTemplate : webStorageTemplate

  try {
    // 下载依赖项
    await downloadAllDependencies(native ? APP_DEPENDENCIES : WEB_DEPENDENCIES)
  } catch (error) {}

  // 写入模版文件
  writeFileIfNotExisted(`${outputPath}/storage.ts`, storageTemplate)
  writeFileIfNotExisted(`${outputPath}/index.ts`, i18nStr)
  writeFileIfNotExisted(`${outputPath}/typing.ts`, typingStr)
  writeFileIfNotExisted(`${outputPath}/context.tsx`, contextStr)
}

/**
 * 写入单个文件，如果文件不存在的话
 */
async function writeFileIfNotExisted(filePath: string, content: string) {
  if (fs.existsSync(filePath)) {
    log(chalk.yellow(`[WARNING] ${filePath} 已存在，跳过写入.`))
    return
  }
  try {
    fs.writeFileSync(filePath, await formatFileWithConfig(content))
  } catch (error) {
    log(chalk.red(`[ERROR] 写入${filePath}失败: ${error.message}`))
  }
}

/**
 * 下载依赖包
 */
async function downloadAllDependencies({
  dependencies,
  devDependencies,
}: DependenciesType) {
  if (dependencies.length > 0 || devDependencies.length > 0) {
    const packagePath = resolvePath('package.json')
    const res = await promiseFs.readFile(packagePath, 'utf8')
    const obj = JSON.parse(res)
    const dependenciesArray = dependencies.filter(
      item => !obj?.['dependencies']?.[item],
    )
    const devDependenciesArray = devDependencies.filter(
      item => obj?.['devDependencies']?.[item],
    )

    if (dependenciesArray.length > 0) {
      await execDownload(dependenciesArray, '')
    }
    if (devDependenciesArray.length > 0) {
      await execDownload(devDependenciesArray, '--dev')
    }

    return Promise.resolve()
  }

  return Promise.resolve()
}

/**
 * 执行下载
 */
function execDownload(packageArr: string[], modifier: string) {
  return new Promise(resolve => {
    const packageStr = packageArr.join(' ')
    log(chalk.green(`[INFO] 开始下载${packageStr}`))
    const child = ChildProcess.exec(
      `yarn add ${packageStr} ${modifier}`,
      {
        timeout: 30000,
      },
      childErr => {
        if (!childErr) {
          log(chalk.green(`[INFO] ${packageStr}下载成功`))
        } else {
          log(chalk.red(`[ERROR] ${packageStr}下载失败，请重新下载`))
        }
        resolve('')
      },
    )
    child?.stdout?.on('data', data => {
      log(data)
    })
    child?.stderr?.on('data', err => {
      log(err)
    })
  })
}

export default writeI18nTemplateFile
