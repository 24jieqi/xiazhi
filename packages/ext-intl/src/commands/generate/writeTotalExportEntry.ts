import * as fs from 'fs'
import * as path from 'path'

import * as chalk from 'chalk'

import { isUseTs, outputPath } from '../../constant'
import { log } from '../../utils/common'
import { formatFileWithConfig } from '../../utils/format'
import type { ExtConfig } from '../config/interface'

/**
 * 多版本的统一入口文件导出
 */
async function writeTotalExportEntry() {
  const { langs } = global['intlConfig'] as ExtConfig
  const basePath = `${outputPath}/langs`
  const extname = '.' + (isUseTs ? 'ts' : 'js')
  const dirObj = {}
  let content = ''
  try {
    for (const lang of langs!) {
      const dir = fs.readdirSync(`${basePath}/${lang}`)
      if (dir.length) {
        content += `import ${lang} from './${lang}/_index';`
        dirObj[lang] = dir
      }
    }
    for (const lang of langs!) {
      content += `export const ${lang.toUpperCase()} = ${dirObj[lang]?.length ? `{ ...${lang} };` : '{ };'} `
    }
  } catch (error) {}
  content = await formatFileWithConfig(content)
  // 写入到文件
  const entryPath = path.resolve(basePath, `index${extname}`)
  try {
    fs.writeFileSync(entryPath, content)
  } catch (error) {
    log(chalk.red(`[ERROR] 文件写入失败 ${entryPath}`))
  }
}

export default writeTotalExportEntry
