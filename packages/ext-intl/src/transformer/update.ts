import * as ts from 'typescript'

import type { OriginEntryItem } from '../interface'

const factory = ts.factory

/**
 * 更新多语言词条文件的transformer
 * @param currentLang 当前语言
 * @param entries 本次词条
 * @returns
 */
export function getUpdateLangFileTransformer(
  currentLang: string,
  entries: OriginEntryItem[],
) {
  const transformer =
    <T extends ts.Node>(context: ts.TransformationContext) =>
    (rootNode: T) => {
      function visit(node: ts.Node) {
        switch (node.kind) {
          case ts.SyntaxKind.PropertyAssignment: {
            const current = node as ts.PropertyAssignment
            const key = current.name.getText()
            const value = current.initializer.getText().replace(/'|"/g, '')
            const finded = entries.find(entry => entry.key === key)
            // 只有找到目标词条且目标词条和当前词条不相等的情况下才更新
            if (
              finded &&
              finded.langs[currentLang] &&
              finded.langs[currentLang] !== value
            ) {
              const valNode = factory.createStringLiteral(
                finded.langs[currentLang],
                true,
              )
              return factory.updatePropertyAssignment(
                current,
                current.name,
                valNode,
              )
            }
          }
        }
        return ts.visitEachChild(node, visit, context)
      }
      return ts.visitNode(rootNode, visit)
    }
  return transformer
}
