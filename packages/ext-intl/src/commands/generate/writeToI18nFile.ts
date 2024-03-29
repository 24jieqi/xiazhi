import * as fs from 'fs'

import * as chalk from 'chalk'
import * as ts from 'typescript'

import { isUseTs, outputPath } from '../../constant'
import type { MatchText } from '../../interface'
import { log, unicodeToChar } from '../../utils/common'
import { fileExist } from '../../utils/file'
import { formatFileWithConfig } from '../../utils/format'
import type { ExtConfig } from '../config/interface'

const factory = ts.factory

function getText(textObj: MatchText, lang: string) {
  const { langs } = global['intlConfig'] as ExtConfig
  const isMainLang = lang === langs![0]
  const text = isMainLang ? textObj.value : textObj[lang] || ''
  return text
    .replace(/;/g, '')
    .replace(/[\r\n]/g, '')
    .replace(/\$/g, '')
    .replace(/[`'"]/g, '')
}

/**
 * 更新具体语言的资源文件
 * @param textArr 提取词条数组
 * @param filePath 读取文件路径
 * @param lang 语言
 */
async function updateI18nFile(
  textArr: MatchText[],
  filePath: string,
  lang: string,
) {
  const file = fs.readFileSync(filePath)
  const printer = ts.createPrinter({})
  const sourceFile = ts.createSourceFile(
    '',
    file.toString(),
    ts.ScriptTarget.ES2015,
    true,
    isUseTs ? ts.ScriptKind.TS : ts.ScriptKind.JS,
  )
  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      addKeyPair(node)
    }
    ts.forEachChild(node, visit)
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
      .filter(item => !existKeyPair?.[item.key])
      .map(item => {
        const property = factory.createPropertyAssignment(
          factory.createIdentifier(`${item.key}`),
          factory.createStringLiteral(
            item?.[lang]?.replace(/[\r\n;]/g, '') || '',
          ),
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
    const updatedObjectLiteral =
      factory.createObjectLiteralExpression(updatedProperties)
    ts.setOriginalNode(updatedObjectLiteral, node)
  }
  visit(sourceFile)
  const updatedFile = printer.printFile(sourceFile)
  const formateFile = unicodeToChar(updatedFile)
  try {
    fs.writeFileSync(filePath, await formatFileWithConfig(formateFile), {
      encoding: 'utf-8',
    })
  } catch (error) {
    log(chalk.red(`[ERROR] 更新词条文件失败：${error}`))
  }
}

/**
 * 创建并写入到具体语言的资源文件中
 * @param textArr 提取词条数组
 * @param filePath 读取文件路径
 * @param lang 语言
 */
async function createAndWriteI18nFile(
  textArr: MatchText[],
  filePath: string,
  lang: string,
) {
  let textStr = textArr
    .map(
      text =>
        `${text.comment.endsWith('\n') ? text.comment : `${text.comment}\n`}${text.key}: '${getText(text, lang)}',`,
    )
    .join('\n')
  textStr = 'export default {\n' + textStr + '\n}'
  try {
    textStr = await formatFileWithConfig(textStr)
  } catch (error) {}

  try {
    fs.writeFileSync(filePath, textStr)
  } catch (error) {
    log(chalk.red(`[ERROR] 创建词条文件失败：${error}`))
  }
}

/**
 * 将本地匹配到的文本写入到具体语言的资源文件中
 * @param textArr 需要写入的词条列表
 * @param lang 具体语言
 */
async function writeToTargetI18nFile(textArr: MatchText[], lang: string) {
  const extname = isUseTs ? '.ts' : '.js'
  const filePath = `${outputPath}/langs/${lang}/index${extname}`
  // 判断文件是否存在
  const exist = await fileExist(filePath)
  if (!exist) {
    await createAndWriteI18nFile(textArr, filePath, lang)
  } else {
    await updateI18nFile(textArr, filePath, lang)
  }
}

/**
 * 将本地匹配到的词条写入到多语言资源文件中
 * @param textArr 需要写入的词条列表
 * @returns
 */
export async function writeToI18nFiles(textArr: MatchText[]) {
  const { langs } = global['intlConfig'] as ExtConfig
  if (textArr.length === 0) return
  for (const lang of langs!) {
    await writeToTargetI18nFile(textArr, lang)
  }
}

export default writeToI18nFiles
