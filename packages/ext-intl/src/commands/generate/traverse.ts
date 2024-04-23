import fs from 'fs/promises'
import path from 'path'

import { IGNORE_I18N_PATH } from '../../constant'
import type { MatchText } from '../../interface'
import type { ExtConfig } from '../config/interface'

import { transformFile } from './transformFile'

/**
 * 递归遍历文件并对中文进行抽取（生成词条文件）
 * @export
 * @param {string} pathName 当前遍历路径
 */
export async function traverseDir(
  pathName: string,
  matchText: MatchText[],
  onTravelFile?: (filePath: string) => void,
) {
  const { whiteList } = global['intlConfig'] as ExtConfig
  if ((await fs.stat(pathName)).isFile()) {
    // 文件
    if (!whiteList.includes(path.extname(pathName))) {
      return
    }
    onTravelFile?.(pathName)
    const text = await fs.readFile(pathName, 'utf-8')
    // 中文转换（文件写入）
    const res = await transformFile(text, pathName)
    matchText.push(...res)
  } else {
    // 文件夹
    const files = await fs.readdir(pathName)
    for (const file of files) {
      const absPath = path.resolve(pathName, file)
      if (absPath !== IGNORE_I18N_PATH) {
        await traverseDir(absPath, matchText)
      }
    }
  }
}
