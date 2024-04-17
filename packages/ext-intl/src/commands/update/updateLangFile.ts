import * as fs from 'fs/promises'
import * as path from 'path'

import * as ts from 'typescript'

import { isUseTs } from '../../constant'
import type { OriginEntryItem } from '../../interface'
import { getUpdateLangFileTransformer } from '../../transformer/update'
import { formatFileWithConfig } from '../../utils/format'

/**
 * 更新文件
 */
export async function updateLangFile(
  langsRootDir: string,
  lang: string,
  entries: OriginEntryItem[],
) {
  const filePath = path.join(
    langsRootDir,
    lang,
    `index.${isUseTs ? 'ts' : 'js'}`,
  )
  const fileStr = await fs.readFile(filePath, 'utf-8')
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
  const updatedFileStr = printer.printFile(transformedFile as ts.SourceFile)
  await fs.writeFile(filePath, await formatFileWithConfig(updatedFileStr))
}
