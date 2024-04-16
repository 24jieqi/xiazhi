import * as ts from 'typescript'

import { getText } from '../commands/generate/writeToI18nFile'
import type { MatchText } from '../interface'

const factory = ts.factory

/**
 * 获取往词条对象里面添加属性的transformer
 * @param textArr
 * @param lang
 * @returns
 */
function getAddPropertyTransformer(textArr: MatchText[], lang: string) {
  const addPropertyTransformer =
    <T extends ts.Node>(context: ts.TransformationContext) =>
    (rootNode: T) => {
      function visit(node: ts.Node) {
        if (ts.isObjectLiteralExpression(node)) {
          return addKeyPair(node)
        }
        return ts.visitEachChild(node, visit, context)
      }
      function addKeyPair(node: ts.ObjectLiteralExpression) {
        const existKeyPair: Record<string, any> = {}
        for (const prop of node.properties) {
          if (ts.isPropertyAssignment(prop)) {
            if (ts.isIdentifier(prop.name)) {
              existKeyPair[prop.name.text] = prop.initializer
                .getText()
                .replace(/'|"/g, '')
            }
          }
        }
        const propertyArray = textArr
          .filter(item => existKeyPair[item.key] === undefined)
          .map(item => {
            const property = factory.createPropertyAssignment(
              factory.createIdentifier(`${item.key}`),
              factory.createStringLiteral(getText(item, lang)),
            )
            // 添加注释
            const commentProperty = ts.addSyntheticLeadingComment(
              property,
              ts.SyntaxKind.MultiLineCommentTrivia,
              `*\n* ${item.value.replace(/[\r\n;]/g, '')}\n`,
              false,
            )
            return commentProperty
          })
        const updatedProperties = [...node.properties, ...propertyArray]
        return factory.updateObjectLiteralExpression(node, updatedProperties)
      }
      return ts.visitNode(rootNode, visit)
    }
  return addPropertyTransformer
}

export default getAddPropertyTransformer
