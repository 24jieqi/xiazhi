import * as fs from 'fs/promises'

import * as chalk from 'chalk'

import { outputPath } from '../../constant'
import type { MatchText } from '../../interface'
import writeI18nTemplateFile from '../../intl'
import {
  log,
  mkRootDirIfNeeded,
  removeDuplicatedText,
  time,
  timeEnd,
} from '../../utils/common'
import { readEntryFile } from '../../utils/file'
import type { ExtConfig } from '../config/interface'

import { traverseDir } from './traverse'
import { updateAppFile } from './updateAppFile'

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
    const { langs, rootPath, extractOnly } = config
    log('[INFO] 开始提取...')
    time('[INFO] 提取用时')
    const unMatchedList: MatchText[] = []
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
    // 2. 遍历文件（提取词条/写入多语言模版等）
    traverseDir(rootPath, _entries => {
      unMatchedList.push(...removeDuplicatedText(unMatchedList, _entries))
    })
    if (!extractOnly) {
      // 3. 如果是非提取模式，写入基于kiwi-intl的模版文件
      await writeI18nTemplateFile()
      await updateAppFile()
    }
    timeEnd('[INFO] 提取用时')
    return unMatchedList
  } catch (error) {
    log(chalk.red('[ERROR]: ', error))
  }
}
