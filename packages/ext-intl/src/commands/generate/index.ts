import * as fs from 'fs/promises'

import * as chalk from 'chalk'

import { outputPath } from '../../constant'
import type { MatchText } from '../../interface'
import writeI18nTemplateFile from '../../intl'
import {
  log,
  mkRootDirIfNeeded,
  removeDuplicatedTextList,
  time,
  timeEnd,
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
    log('[INFO] 开始提取...')
    time('[INFO] 提取用时')
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
    // 2. 遍历文件（提取词条/写入多语言模版等）
    await traverseDir(rootPath, matchTextList)
    matchTextList = removeDuplicatedTextList(matchTextList)
    const unMatchedList = matchTextList.filter(item => !item.isMatch)
    if (!extractOnly) {
      await writeI18nTemplateFile()
      await updateAppFile(appFilePath!)
      // 将所有查找到的词条去重后写入词条文件
      await writeToI18nFiles(matchTextList)
    }
    timeEnd('[INFO] 提取用时')
    await uploadAction({
      origin: config.origin!,
      unMatchedList,
      accessKey: config.accessKey!,
    })
    return unMatchedList
  } catch (error) {
    log(chalk.red('[ERROR]: ', error))
  }
}
