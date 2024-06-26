import chalk from 'chalk'
import { pinyin } from 'pinyin-pro'
import ts from 'typescript'

import type { ExtConfig } from '../commands/config/interface'
import { DOUBLE_BYTE_REGEX } from '../constant'
import type { MatchText, OriginEntryItem } from '../interface'
import { getVariableFromTemplateString, log } from '../utils/common'

export function generateEntryKey(langText: string) {
  return langText
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word
      }
      return word.substring(0, 1).toUpperCase() + word.substring(1)
    })
    .join('_')
}

function generateKey(text: string) {
  const noCharText = text.replace(/[^\u4E00-\u9FA5A-Za-z0-9\n]/g, '') // 只匹配中文-英文字母-数字
  const pinYinRaw = pinyin(noCharText, {
    toneType: 'none',
  })
  const pinYinStr = generateEntryKey(pinYinRaw)
  return pinYinStr.length > 40 ? '' : pinYinStr
}

const factory = ts.factory

/**
 * 获取一个中文提取/替换的转换器
 * @param matches 匹配到的中文词条
 * @param fileName 文件名
 * @param code 文件字符串
 * @returns
 */
function getChineseTransformer(
  matches: Array<MatchText>,
  fileName: string,
  code: string,
) {
  const entries: OriginEntryItem[] = global['local_entries']
  const { templateString } = global['intlConfig'] as ExtConfig
  function getTargetEntry(text: string) {
    const targetEntry = entries.find(entry => entry.mainLangText === text)
    const langs = targetEntry?.langs || {}
    const key = targetEntry?.key || generateKey(text)
    const isMatch = !!targetEntry
    return {
      targetEntry,
      langs,
      key,
      isMatch,
    }
  }
  const chineseTransformer =
    <T extends ts.Node>(context: ts.TransformationContext) =>
    (rootNode: T) => {
      function visit(node: ts.Node) {
        switch (node.kind) {
          case ts.SyntaxKind.StringLiteral: {
            const { text: rawText } = node as ts.StringLiteral
            const text = rawText.trim().replace(/([\n;]|\n;)$/, '')
            if (text.match(DOUBLE_BYTE_REGEX)) {
              const { key, isMatch, langs } = getTargetEntry(text)
              matches.push({
                isMatch,
                key,
                value: text,
                comment: `
            /**
             * ${text}
             */`,
                ...langs,
              })
              if (!key) {
                log(
                  chalk.yellow(
                    `\n[WARNNING] 词条<${text}>无法自动生成key，请手动维护key后再进行多语言替换`,
                  ),
                )
                break
              }
              const parentNodeKind = node.parent.kind
              const result =
                parentNodeKind === ts.SyntaxKind.JsxAttribute
                  ? `{I18N.${key}}`
                  : `I18N.${key}`
              return factory.createIdentifier(result)
            }
            break
          }
          case ts.SyntaxKind.JsxText: {
            // fixd: 通过getText获取到的文本已经不包含注释
            let text = node.getText().trim()
            text = text.replace(/([\n;]|\n;)$/, '')
            if (text.match(DOUBLE_BYTE_REGEX)) {
              const { key, isMatch, langs } = getTargetEntry(text)
              matches.push({
                isMatch,
                key,
                value: text,
                comment: `
            /**
             * ${text}
             */`,
                ...langs,
              })
              if (!key) {
                log(
                  chalk.yellow(
                    `\n[WARNNING] 词条<${text}>无法自动生成key，请手动维护key后再进行多语言替换`,
                  ),
                )
                break
              }
              return factory.createJsxText(`{I18N.${key}}`)
            }
            break
          }
          case ts.SyntaxKind.TemplateExpression: {
            const { pos, end } = node
            let text = code.slice(pos, end)
            if (text.match(DOUBLE_BYTE_REGEX)) {
              text = text.replace(/\$(?=\{)/g, '')
              if (templateString && templateString.funcName) {
                const { key, isMatch, langs } = getTargetEntry(text)
                matches.push({
                  isMatch,
                  key,
                  value: text,
                  comment: `
            /**
             * ${text}
             */`,
                  ...langs,
                })
                if (!key) {
                  log(
                    chalk.yellow(
                      `\n[WARNNING] 词条<${text}>无法自动生成key，请手动维护key后再进行多语言替换`,
                    ),
                  )
                  break
                }
                // 返回新的节点(函数调用)
                const variableList: string[] =
                  getVariableFromTemplateString(text)
                const objParam = factory.createObjectLiteralExpression(
                  variableList.map(variable =>
                    factory.createPropertyAssignment(
                      variable,
                      factory.createIdentifier(variable),
                    ),
                  ),
                )
                return factory.createCallExpression(
                  factory.createIdentifier(templateString.funcName),
                  undefined,
                  [factory.createIdentifier(`I18N.${key}`), objParam],
                )
              } else {
                log(
                  chalk.yellow(
                    `[WARNING] templateString未配置：${fileName} ${text} 无法处理`,
                  ),
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
  return chineseTransformer
}

export default getChineseTransformer
