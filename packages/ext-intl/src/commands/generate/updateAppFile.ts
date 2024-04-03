import * as fs from 'fs'

import * as ts from 'typescript'

import { IMPORT_CONTEXT_STATEMENT, isUseTs } from '../../constant'
import type { FnType } from '../../transformer/using'
import { saveFile } from '../../utils/file'
import type { ExtConfig } from '../config/interface'

const factory = ts.factory

/**
 * 找到最终更新的函数组件
 * @param name 比较名称
 * @param fnNode 函数
 */
function findUpdateFn(name: string, fnNode: FnType) {
  switch (fnNode.kind) {
    case ts.SyntaxKind.ArrowFunction: {
      const parent = fnNode.parent as ts.VariableDeclaration
      if (parent.kind === ts.SyntaxKind.VariableDeclaration) {
        return parent.name.getText() === name
      }
      return false
    }
    case ts.SyntaxKind.FunctionDeclaration: {
      return fnNode!.name!.escapedText === name
    }
    case ts.SyntaxKind.FunctionExpression: {
      const parent = fnNode.parent as ts.VariableDeclaration
      if (parent.kind === ts.SyntaxKind.VariableDeclaration) {
        return parent.name.getText() === name
      }
      return false
    }
  }
}

/**
 * 向文件中添加import语句
 * @param ast 目标文件的sourceFile
 * @param code 目标文件的字符串
 * @returns 修改后的sourceFile
 */
export function addImportContextWrapperToFile(
  ast: ts.SourceFile,
  code: string,
) {
  if (code.includes(IMPORT_CONTEXT_STATEMENT)) {
    return ast
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
          factory.createIdentifier('I18NContextWrapper'),
        ),
      ]),
    ),
    factory.createStringLiteral('@/i18n/context', true),
  )
  const updatedStatements = [importStatement, ...ast.statements]
  return factory.updateSourceFile(ast, updatedStatements)
}

export async function updateAppFile() {
  const { rootPath, extractOnly } = global['intlConfig'] as ExtConfig
  let handleFuncName = ''

  const findExportDefault =
    <T extends ts.Node>(context: ts.TransformationContext) =>
    (rootNode: T) => {
      function visit(node: ts.Node) {
        switch (node.kind) {
          // 处理箭头函数（表达式和代码块）
          case ts.SyntaxKind.ExportAssignment: {
            handleFuncName = (node as ts.ExportAssignment).expression.getText()
            break
          }
        }
        return ts.visitEachChild(node, visit, context)
      }
      return ts.visitNode(rootNode, visit)
    }

  const transformToI18NContext =
    <T extends ts.Node>(context: ts.TransformationContext) =>
    (rootNode: T) => {
      function visit(node: ts.Node) {
        switch (node.kind) {
          // 处理函数定义
          case ts.SyntaxKind.ReturnStatement: {
            const returnStatementNode = node as ts.ReturnStatement
            const returnParentNode = returnStatementNode.parent.parent as FnType
            if (findUpdateFn(handleFuncName, returnParentNode)) {
              const updatedReturnStatement = factory.createReturnStatement(
                factory.createJsxElement(
                  factory.createJsxOpeningElement(
                    factory.createIdentifier('I18NContextWrapper'),
                    undefined,
                    factory.createJsxAttributes([]),
                  ),
                  [(returnStatementNode as any).expression],
                  factory.createJsxClosingElement(
                    factory.createIdentifier('I18NContextWrapper'),
                  ),
                ),
              )

              return updatedReturnStatement
            }
          }
        }
        return ts.visitEachChild(node, visit, context)
      }
      return ts.visitNode(rootNode, visit)
    }

  try {
    const filePath = `${rootPath}/App.${isUseTs ? 'tsx' : 'jsx'}`
    const file = fs.readFileSync(filePath)

    if (!file.includes('I18NContextWrapper')) {
      const ast = ts.createSourceFile(
        '',
        file.toString(),
        ts.ScriptTarget.ES2015,
        true,
        isUseTs ? ts.ScriptKind.TS : ts.ScriptKind.JS,
      )

      let transformedFile = ts.transform(ast, [
        findExportDefault,
        transformToI18NContext,
      ]).transformed[0] as ts.SourceFile

      if (!extractOnly) {
        transformedFile = addImportContextWrapperToFile(
          transformedFile,
          transformedFile.getText(),
        )
        await saveFile(transformedFile, filePath)
      }
    }
  } catch (error) {}
}
