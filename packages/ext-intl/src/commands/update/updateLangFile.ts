import * as fs from 'fs/promises'
import * as path from 'path'

import * as ts from 'typescript'

import { isUseTs } from '../../constant'
import type { OriginEntryItem } from '../../interface'
import { getUpdateLangFileTransformer } from '../../transformer/update'
import { formatFileWithConfig } from '../../utils/format'

/**
 * 更新单个词条文件
 * @param langsRootDir 词条文件基础目录
 * @param lang 当前词条文件语言
 * @param entries 已读取的本地词条
 */
export async function updateLangFile(
  langsRootDir: string,
  lang: string,
  entries: OriginEntryItem[],
) {
  // 1. 单个语言词条文件path
  const filePath = path.join(
    langsRootDir,
    lang,
    `index.${isUseTs ? 'ts' : 'js'}`,
  )
  // 2. 读取文件
  const fileStr = await fs.readFile(filePath, 'utf-8')
  // 3. 通过AST转换，匹配到属性节点，并在本地词条中查找，如果找到且词条发生了变更，则更新写入
  const ast = ts.createSourceFile(
    '',
    fileStr,
    ts.ScriptTarget.ES2015,
    true,
    ts.ScriptKind.TS,
  )
  const transformedFile = ts.transform(ast, [
    getUpdateLangFileTransformer(lang, entries),
  ]).transformed[0]
  const printer = ts.createPrinter()
  // 4. 转换完成，重新写入
  const updatedFileStr = printer.printFile(transformedFile as ts.SourceFile)
  await fs.writeFile(filePath, await formatFileWithConfig(updatedFileStr))
}
