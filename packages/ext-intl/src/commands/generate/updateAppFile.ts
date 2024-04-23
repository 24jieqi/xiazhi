import fs from 'fs'
import path from 'path'

import ts from 'typescript'

import { IMPORT_CONTEXT_STATEMENT, isUseTs } from '../../constant'
import type { FnType } from '../../transformer/using'
import { getOutputPath } from '../../utils/common'
import { saveFile } from '../../utils/file'

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
  appFilePath: string,
) {
  if (code.includes(IMPORT_CONTEXT_STATEMENT)) {
    return ast
  }
  const { dir } = path.parse(appFilePath)
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
          factory.createIdentifier('I18NContextWrapper'),
        ),
      ]),
    ),
    factory.createStringLiteral(relativePath, true),
  )
  const updatedStatements = [importStatement, ...ast.statements]
  return factory.updateSourceFile(ast, updatedStatements)
}

/**
 * 更新入口文件，添加I18NProvider
 * @param appFilePath
 */
export async function updateAppFile(appFilePath: string) {
  let handleFuncName = ''
  // 找到作为默认导出的那个组件的函数名
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
  // 在return语句的最外层添加Provider
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
    const fileStr = fs.readFileSync(appFilePath, 'utf-8')
    if (!fileStr.includes('I18NContextWrapper')) {
      const ast = ts.createSourceFile(
        '',
        fileStr,
        ts.ScriptTarget.ES2015,
        true,
        isUseTs ? ts.ScriptKind.TS : ts.ScriptKind.JS,
      )

      let transformedFile = ts.transform(ast, [
        findExportDefault,
        transformToI18NContext,
      ]).transformed[0] as ts.SourceFile

      transformedFile = addImportContextWrapperToFile(
        transformedFile,
        fileStr,
        appFilePath,
      )
      await saveFile(transformedFile, appFilePath)
    }
  } catch {}
}
