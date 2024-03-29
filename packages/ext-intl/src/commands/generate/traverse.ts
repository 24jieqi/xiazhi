import * as fs from 'fs'
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
  if (fs.statSync(pathName).isFile()) {
    // 单个文件
    if (!whiteList.includes(path.extname(pathName))) {
      return
    }
    const text = fs.readFileSync(pathName).toString()
    const result = await transformFile(text, pathName)
    getUnMatchedEntries?.(result.filter(item => !item.isMatch))
    // 只有非提取模式下才生成词条文件
    if (!extractOnly) {
      writeOutputFile(
        removeDuplicatedTextList(result).filter(item => item.isMatch),
      )
    }
  } else {
    // 文件夹
    const files = fs.readdirSync(pathName)
    files.forEach(file => {
      const absPath = path.resolve(pathName, file)
      if (absPath !== IGNORE_I18N_PATH) {
        traverseDir(absPath, getUnMatchedEntries)
      }
    })
  }
}
