import fs from 'fs/promises'

import chalk from 'chalk'
import ts from 'typescript'

import type { OriginEntryItem } from '../interface'

import { getOutputPath, handle, log } from './common'

/**
 * 读取本地词条文件
 * @returns
 */
export async function readEntryFile(): Promise<OriginEntryItem[]> {
  const entryFilePath = getOutputPath()
  const [data, error] = await handle<string>(
    fs.readFile(`${entryFilePath}/entries.json`, { encoding: 'utf-8' }),
  )
  if (error && error.code !== 'ENOENT') {
    log(chalk.yellow('[WARNNING] 读取本地词条文件失败'))
    return []
  }
  return JSON.parse(data || '[]')
}

/**
 * 检测给定的文件路径是否存在
 * @param filePath
 * @returns
 */
export async function fileExist(filePath: string): Promise<boolean> {
  try {
    await fs.stat(filePath)
    return true
  } catch {
    return false
  }
}

/**
 * 保存文件
 * @param ast 文件的sourceFile
 * @param filePath 文件的绝对路径
 */
export async function saveFile(ast: ts.SourceFile, filePath: string) {
  const printer = ts.createPrinter()
  const fileText = printer.printFile(ast)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, error] = await handle(fs.writeFile(filePath, fileText))
  if (error) {
    log(chalk.red(`[ERROR] 无法生成文件，请手动替换: ${filePath}`))
  }
}
