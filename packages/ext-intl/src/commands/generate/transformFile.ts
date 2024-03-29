import * as ts from 'typescript'

import type { MatchText } from '../../interface'
import getChineseTransformer from '../../transformer/chinese'
import { usingTransformer } from '../../transformer/using'
import { addImportToFile } from '../../utils/addImport'
import { saveFile } from '../../utils/file'
import type { ExtConfig } from '../config/interface'

/**
 * 在源文件中查找中文词条（替换）
 * @param code 源代码
 * @param fileName 当前文件路径名
 */
export async function transformFile(code: string, fileName: string) {
  const { extractOnly } = global['intlConfig'] as ExtConfig
  const matches: Array<MatchText> = []
  const ast = ts.createSourceFile(
    '',
    code,
    ts.ScriptTarget.ES2015,
    true,
    ts.ScriptKind.TSX,
  )
  const transformers = [getChineseTransformer(matches, fileName, code)]
  if (!extractOnly) {
    transformers.push(usingTransformer)
  }
  let transformedFile = ts.transform(ast, transformers)
    .transformed[0] as ts.SourceFile
  if (!extractOnly && matches.length > 0) {
    transformedFile = addImportToFile(transformedFile, code)
    await saveFile(transformedFile, fileName)
  }
  return matches
}
