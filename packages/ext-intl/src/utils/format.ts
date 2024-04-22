import * as chalk from 'chalk'
import * as prettier from 'prettier'

import { log } from './common'
/**
 * 使用项目中的prettier配置进行格式化
 * @param text 需要格式化的文本
 * @param configFilePath 配置开始搜索的目录
 * @returns 格式化后的文本
 */
export async function formatFileWithConfig(
  text: string,
  configFilePath?: string,
  parser: prettier.BuiltInParserName = 'typescript',
) {
  let options: prettier.Options = {
    parser,
    bracketSpacing: true,
    jsxBracketSameLine: true,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'avoid',
    semi: false,
    useTabs: true,
    proseWrap: 'never',
  }
  const _configFilePath = configFilePath || (await prettier.resolveConfigFile())
  if (!_configFilePath) {
    log(
      chalk.yellow(
        '[WARNING] 无法查找到prettier格式化配置，将使用默认配置格式化',
      ),
    )
  } else {
    const configFinded = await prettier.resolveConfig(_configFilePath!)
    if (configFinded) {
      options = {
        ...configFinded,
        parser,
      }
    }
  }
  return prettier.format(text, options)
}
