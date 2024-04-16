import * as fs from 'fs/promises'
import * as path from 'path'

import { IGNORE_I18N_PATH } from '../../constant'
import type { MatchText } from '../../interface'
import { removeDuplicatedTextList } from '../../utils/common'
import type { ExtConfig } from '../config/interface'

import { transformFile } from './transformFile'
import writeOutputFile from './writeToI18nFile'

/**
 * 递归遍历文件并对中文进行抽取（生成词条文件）
 * @export
 * @param {string} pathName 当前遍历路径
 */
export async function traverseDir(
  pathName: string,
  getUnMatchedEntries?: (entries: MatchText[]) => void,
) {
  const { whiteList, extractOnly } = global['intlConfig'] as ExtConfig
  if ((await fs.stat(pathName)).isFile()) {
    // 文件
    if (!whiteList.includes(path.extname(pathName))) {
      return
    }
    const text = await fs.readFile(pathName, 'utf-8')
    // 中文转换（文件写入）
    const result = await transformFile(text, pathName)
    // 通过callback的形式对外保留未匹配到的词条
    getUnMatchedEntries?.(result.filter(item => !item.isMatch))
    // 将所有查找到的词条去重后写入词条文件
    if (!extractOnly) {
      await writeOutputFile(removeDuplicatedTextList(result))
    }
  } else {
    // 文件夹
    const files = await fs.readdir(pathName)
    files.forEach(async file => {
      const absPath = path.resolve(pathName, file)
      if (absPath !== IGNORE_I18N_PATH) {
        await traverseDir(absPath, getUnMatchedEntries)
      }
    })
  }
}
