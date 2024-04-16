import * as ts from 'typescript'

import { USE_STATEMENT } from '../constant'
import { isFunctionHasJSX, isNestedFunction } from '../utils/common'

const factory = ts.factory

export type FnType =
  | ts.ArrowFunction
  | ts.FunctionDeclaration
  | ts.FunctionExpression

/**
 * 获取新的函数体（Block类型）如果没有变化（先前已经注入过了，则返回）
 * @param fn
 * @returns
 */
function getNewBlock(fn: FnType) {
  const originalFn = fn
  const useStatement = factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createObjectBindingPattern([
            factory.createBindingElement(
              undefined,
              undefined,
              factory.createIdentifier('I18N'),
              undefined,
            ),
          ]),
          undefined,
          undefined,
          factory.createCallExpression(
            factory.createIdentifier('useI18n'),
            undefined,
            [],
          ),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  )
  if (fn.body && ts.isBlock(fn.body)) {
    for (const statement of fn.body.statements) {
      let statementStr = ''
      try {
        statementStr = statement.getText().trim()
      } catch {}
      if (USE_STATEMENT === statementStr) {
        return
      }
    }
    const originalBody = originalFn.body as ts.FunctionBody
    const newStatements = factory.createNodeArray([
      useStatement,
      ...originalBody.statements,
    ])
    return factory.updateBlock(originalBody, newStatements)
  }
}

/**
 * 是否是目标函数（判断是否是嵌套函数 是否返回了JSX）
 * @param fn
 * @returns
 */
function isTargetFn(fn: ts.Node) {
  return (
    !isNestedFunction(fn) &&
    isFunctionHasJSX(fn as unknown as ts.FunctionDeclaration)
  )
}

/**
 * 处理`useI18n`使用侧在函数内部声明的转换器
 * @param context
 * @returns
 */
export const usingTransformer =
  <T extends ts.Node>(context: ts.TransformationContext) =>
  (rootNode: T) => {
    function visit(node: ts.Node) {
      switch (node.kind) {
        // 处理箭头函数（表达式和代码块）
        case ts.SyntaxKind.ArrowFunction: {
          if (isTargetFn(node)) {
            const originalFn = node as ts.ArrowFunction
            const newBlock = getNewBlock(originalFn)
            if (newBlock) {
              return factory.updateArrowFunction(
                originalFn,
                originalFn.modifiers,
                originalFn.typeParameters,
                originalFn.parameters,
                originalFn.type,
                originalFn.equalsGreaterThanToken,
                newBlock,
              )
            }
          }
          break
        }
        // 处理函数定义
        case ts.SyntaxKind.FunctionDeclaration: {
          if (isTargetFn(node)) {
            const originalFn = node as ts.FunctionDeclaration
            const newBlock = getNewBlock(originalFn)
            if (newBlock) {
              return factory.updateFunctionDeclaration(
                originalFn,
                originalFn.modifiers,
                originalFn.asteriskToken,
                originalFn.name,
                originalFn.typeParameters,
                originalFn.parameters,
                originalFn.type,
                newBlock,
              )
            }
          }
          break
        }
        // 处理函数表达式
        case ts.SyntaxKind.FunctionExpression: {
          if (isTargetFn(node)) {
            const originalFn = node as ts.FunctionExpression
            const newBlock = getNewBlock(originalFn)
            if (newBlock) {
              return factory.updateFunctionExpression(
                originalFn,
                originalFn.modifiers,
                originalFn.asteriskToken,
                originalFn.name,
                originalFn.typeParameters,
                originalFn.parameters,
                originalFn.type,
                newBlock,
              )
            }
          }
          break
        }
      }
      return ts.visitEachChild(node, visit, context)
    }
    return ts.visitNode(rootNode, visit)
  }
