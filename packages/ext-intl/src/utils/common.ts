/* eslint-disable no-console */
import fs from 'fs'
import fsPromise from 'fs/promises'
import path from 'path'

import { isType } from '@fruits-chain/utils'
import ts from 'typescript'

import type { MatchText } from '../interface'

/**
 * 去掉文件中的注释
 * @param code
 * @param fileName
 */
export function removeFileComment(code: string, fileName: string) {
  const printer: ts.Printer = ts.createPrinter({ removeComments: true })
  const sourceFile: ts.SourceFile = ts.createSourceFile(
    '',
    code,
    ts.ScriptTarget.ES2015,
    true,
    fileName.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  )
  return printer.printFile(sourceFile)
}

/**
 * 按分割符'/'返回解析后的路径列表
 * @param fileRelativePath
 * @returns
 */
function parsePath(fileRelativePath: string) {
  const { dir, name } = path.parse(fileRelativePath)
  const paths: string[] = []
  const spliter = /[\/\\\\]/
  paths.push(...dir.split(spliter).filter(Boolean))
  paths.push(name)
  return paths
}

/**
 * 获取应用路径字符
 * @param rootPath
 * @param filePath
 * @param versionName
 * @returns
 */
export function getQuotePath(
  rootPath: string,
  filePath: string,
  versionName: string,
) {
  const relativePath = filePath.replace(rootPath, '')
  const paths = parsePath(relativePath).map(item => formatFileName(item)) // 把短横线换成下划线
  return `I18N.${versionName}.${paths.join('.')}`
}

/**
 * 获取模板字符串中的变量名
 * @param text 模板字符串
 */

export function getVariableFromTemplateString(text: string) {
  if (!text) {
    return []
  }
  const reg = /\{(.+?)\}/g
  const variableList: string[] = []
  while (true) {
    const result = reg.exec(text)
    if (!result) break
    variableList.push(result[1])
  }
  return variableList
}

/**
 * 基于当前目录生成绝对路径
 * @param pathName
 */
export function resolvePath(pathName: string) {
  return path.resolve(process.cwd(), pathName)
}
/**
 * 检测是否是ts环境
 */
export function useTs(): boolean {
  return fs.existsSync(resolvePath('tsconfig.json'))
}

/**
 * 简易判断是否是RN
 * @returns
 */
export function isNative() {
  return fs.existsSync(resolvePath('metro.config.js'))
}

/**
 * 获取输出路径(兼容vscode插件)
 */
export function getOutputPath() {
  return resolvePath('./src/i18n')
}

/**
 * 格式化文件名称
 * @param fnameStr
 * @returns
 */
export function formatFileName(fnameStr: string) {
  const fileNameArr = fnameStr.split('-')
  return fileNameArr
    .map((name, index) => {
      if (index === 0) {
        return name
      }
      return name.substring(0, 1).toUpperCase() + name.substring(1)
    })
    .join('')
}

export function isAndEmpty(
  value: any,
  type:
    | 'Array'
    | 'Object'
    | 'Function'
    | 'String'
    | 'Number'
    | 'Null'
    | 'Undefined'
    | 'Map'
    | 'Set'
    | 'RegExp',
  validator: (value: any) => boolean,
) {
  return isType(type)(value) && validator(value)
}

export const log = console.log
export const time = console.time
export const timeEnd = console.timeEnd

/**
 * 异步处理函数
 * @param promise
 * @returns
 */
export async function handle<DataType = any>(
  promise: Promise<DataType>,
): Promise<[DataType, any]> {
  try {
    const data = await promise
    return [data, undefined]
  } catch (err) {
    return [undefined as any, err]
  }
}

/**
 * 多语言根目录创建（如果已经存在则跳过）
 */
export async function mkRootDirIfNeeded() {
  const rootDir = getOutputPath()
  try {
    await fsPromise.access(rootDir)
  } catch (error) {
    await fsPromise.mkdir(rootDir, { recursive: true })
  }
}

/**
 * 匹配到词条去除重复
 * @param textSet 当前已去重词条列表
 * @param list 需要去重的词条数据
 * @returns 自身去重和已去重列表去重后的结果
 */
export function removeDuplicatedText(textSet: MatchText[], list: MatchText[]) {
  const result: MatchText[] = []
  for (const item of list) {
    if (
      !textSet.find(one => one.value === item.value) &&
      !result.find(i => i.value === item.value)
    ) {
      result.push(item)
    }
  }
  return result
}

/**
 * 单个列表的词条数据去重复
 * @param list
 */
export function removeDuplicatedTextList(list: MatchText[]) {
  const result: MatchText[] = []
  for (const item of list) {
    if (!result.find(one => one.value === item.value)) {
      result.push(item)
    }
  }
  return result
}

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

/**
 * 是否是嵌套函数
 * @param node
 * @returns
 */
export function isNestedFunction(node: ts.Node) {
  let current: ts.Node = node
  while (current.parent) {
    current = current.parent
    if (ts.isFunctionDeclaration(current) || ts.isArrowFunction(current)) {
      return true
    }
  }
  return false
}

/**
 * return 语句中是否有JSX节点
 * @param node
 * @returns
 */
function isReturnStatementHasJSX(node: ts.Node): true | undefined {
  if (node) {
    if (node.kind === ts.SyntaxKind.JsxElement) {
      return true
    }
    return ts.forEachChild(node, isReturnStatementHasJSX)
  }
}

/**
 * 是否是一个函数定义，并且包含JSX返回值
 * @param node
 * @returns
 */
export function isFunctionHasJSX(node: ts.FunctionDeclaration) {
  const { body, parent } = node
  let res = false
  if (!body) {
    return res
  }
  body.forEachChild(child => {
    if (child.kind === ts.SyntaxKind.ReturnStatement) {
      const jsx = isReturnStatementHasJSX(child)
      if (jsx && parent?.kind !== ts.SyntaxKind.CallExpression) {
        res = true
        return
      }
    }
  })
  return res
}

export function unicodeToChar(str: string) {
  return str.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
  })
}

/**
 * 获取节点的字符串
 * @param node 目标节点
 * @param sourceFile
 * @returns
 */
export function getTextOfNode(
  node: ts.Node,
  sourceFile: ts.SourceFile,
): string {
  const { pos, end } = node
  return sourceFile.text.substring(pos, end)
}
