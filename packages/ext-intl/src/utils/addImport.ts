import * as ts from 'typescript'

import { IMPORT_STATEMENT } from '../constant'

const factory = ts.factory

/**
 * 向文件中添加import语句
 * @param ast 目标文件的sourceFile
 * @param code 目标文件的字符串
 * @returns 修改后的sourceFile
 */
export function addImportToFile(ast: ts.SourceFile, code: string) {
  if (code.includes(IMPORT_STATEMENT)) {
    return ast
  }
  const importStatement = factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(
      false,
      undefined,
      ts.factory.createNamedImports([
        ts.factory.createImportSpecifier(
          false,
          undefined,
          ts.factory.createIdentifier('useI18n'),
        ),
      ]),
    ),
    ts.factory.createStringLiteral('@/i18n/context', true),
  )
  const updatedStatements = [importStatement, ...ast.statements]
  return factory.updateSourceFile(ast, updatedStatements)
}
