import fs from 'fs/promises'

import chalk from 'chalk'
import ora from 'ora'
import ts from 'typescript'

import { isUseTs, outputPath } from '../../constant'
import type { MatchText } from '../../interface'
import getAddPropertyTransformer from '../../transformer/property'
import { log, unicodeToChar } from '../../utils/common'
import { fileExist } from '../../utils/file'
import { formatFileWithConfig } from '../../utils/format'
import type { ExtConfig } from '../config/interface'

export function getText(textObj: MatchText, lang: string) {
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
  const file = await fs.readFile(filePath, 'utf-8')
  const printer = ts.createPrinter({})
  const sourceFile = ts.createSourceFile(
    '',
    file,
    ts.ScriptTarget.ES2015,
    true,
    isUseTs ? ts.ScriptKind.TS : ts.ScriptKind.JS,
  )
  const transformedSourceFile = ts.transform(sourceFile, [
    getAddPropertyTransformer(textArr, lang),
  ]).transformed[0] as ts.SourceFile
  const fileStr = unicodeToChar(printer.printFile(transformedSourceFile))
  try {
    await fs.writeFile(filePath, await formatFileWithConfig(fileStr), {
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
    await fs.writeFile(filePath, textStr)
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
async function writeToI18nFiles(textArr: MatchText[]) {
  const { langs } = global['intlConfig'] as ExtConfig
  if (textArr.length === 0) return
  const spinner = ora(chalk.cyan('[INFO] 更新/生成词条文件'))
  try {
    for (const lang of langs!) {
      await writeToTargetI18nFile(textArr, lang)
    }
    spinner.succeed()
  } catch (error) {
    spinner.fail()
  }
}

export default writeToI18nFiles
