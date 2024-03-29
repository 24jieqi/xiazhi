import * as fs from 'fs'
import * as path from 'path'

import * as ts from 'typescript'

import { isUseTs } from '../../constant'
import { formatFileWithConfig } from '../../utils/format'

import { updateLangFile } from './updateLangFile'

/**
 * 递归遍历文件并对中文进行抽取
 * @export
 * @param {string} pathName 当前遍历路径
 */
export async function traverseDir(
  file: string,
  pathName: string,
  langType: string,
) {
  if (fs.statSync(pathName).isFile()) {
    if (file === `index.${isUseTs ? 'ts' : 'js'}`) {
      const text = fs.readFileSync(pathName).toString()
      const ast = ts.createSourceFile(
        '',
        text,
        ts.ScriptTarget.ES2015,
        true,
        ts.ScriptKind.TS,
      )
      let result = updateLangFile(ast, langType)
      result = unescape(result.replace(/\\u/g, '%u'))
      fs.writeFileSync(pathName, await formatFileWithConfig(result))
    }
  } else {
    // 文件夹
    const files = fs.readdirSync(pathName)
    files.forEach(_file => {
      const absPath = path.resolve(pathName, _file)
      traverseDir(_file, absPath, langType)
    })
  }
}
