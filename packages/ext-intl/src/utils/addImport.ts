import path from 'path'

import ts from 'typescript'

import { IMPORT_STATEMENT } from '../constant'

import { getOutputPath } from './common'

const factory = ts.factory

/**
 * 向文件中添加import语句
 * @param ast 目标文件的sourceFile
 * @param code 目标文件的字符串
 * @returns 修改后的sourceFile
 */
export function addImportToFile(
  ast: ts.SourceFile,
  code: string,
  filePath: string,
) {
  if (code.includes(IMPORT_STATEMENT)) {
    return ast
  }
  const { dir } = path.parse(filePath)
  let relativePath = path
    .join(path.relative(dir, getOutputPath()), 'context')
    .replaceAll(path.sep, '/')
  if (!relativePath.startsWith('./')) {
    relativePath = `./${relativePath}`
  }
  const importStatement = factory.createImportDeclaration(
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(
          false,
          undefined,
          factory.createIdentifier('useI18n'),
        ),
      ]),
    ),
    factory.createStringLiteral(relativePath, true),
  )
  const updatedStatements = [importStatement, ...ast.statements]
  return factory.updateSourceFile(ast, updatedStatements)
}
