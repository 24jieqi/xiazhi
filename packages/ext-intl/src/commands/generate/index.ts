import fs from 'fs/promises'

import { formatDuration } from '@fruits-chain/utils'
import chalk from 'chalk'
import ora from 'ora'

import { outputPath } from '../../constant'
import type { MatchText } from '../../interface'
import writeI18nTemplateFile from '../../intl'
import {
  log,
  mkRootDirIfNeeded,
  removeDuplicatedTextList,
} from '../../utils/common'
import { readEntryFile } from '../../utils/file'
import type { ExtConfig } from '../config/interface'
import { uploadAction } from '../sync/uploadAction'

import { traverseDir } from './traverse'
import { updateAppFile } from './updateAppFile'
import writeToI18nFiles from './writeToI18nFile'

/**
 * 开始中文提取，返回匹配到的中文词条
 * @param config
 * @returns
 */
export async function start(config: ExtConfig) {
  try {
    // 配置和本地词条挂载到全局
    global['intlConfig'] = {
      ...config,
    }
    const entries = await readEntryFile()
    global['local_entries'] = entries
    const { langs, rootPath, extractOnly, appFilePath } = config
    const beginTimestamp = Date.now()
    // 1. 创建多语言根目录&此次提取的词条目录
    try {
      await mkRootDirIfNeeded()
      if (!extractOnly) {
        for (const lang of langs!) {
          await fs.mkdir(`${outputPath}/langs/${lang}`, {
            recursive: true,
          })
        }
      }
    } catch (error) {
      const code = error.code
      if (code && code !== 'EEXIST') {
        throw error
      }
    }
    let matchTextList: MatchText[] = []
    const spinner = ora(chalk.cyan('[INFO] 开始从文件中提取词条...')).start()
    // 2. 遍历文件（提取词条/写入多语言模版等）
    await traverseDir(rootPath, matchTextList, (filePath: string) => {
      spinner.text = `[INFO] 提取文件：${filePath}`
      spinner.color = 'cyan'
    })
    spinner.succeed(chalk.cyan('[INFO] 词条提取'))
    matchTextList = removeDuplicatedTextList(matchTextList)
    const unMatchedList = matchTextList.filter(item => !item.isMatch)
    if (!extractOnly) {
      await writeI18nTemplateFile()
      await updateAppFile(appFilePath!)
      // 将所有查找到的词条去重后写入词条文件（前提是得有key）
      await writeToI18nFiles(matchTextList.filter(text => text.key))
    }
    if (config.origin && config.accessKey) {
      await uploadAction({
        origin: config.origin,
        unMatchedList,
        accessKey: config.accessKey,
      })
    }
    log(
      chalk.green(
        `[INFO] 耗时：${formatDuration(Date.now() - beginTimestamp)}`,
      ),
    )
    return unMatchedList
  } catch (error) {
    log(chalk.red('[ERROR]', error))
  }
}
