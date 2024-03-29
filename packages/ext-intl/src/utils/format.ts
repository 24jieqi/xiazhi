import * as chalk from 'chalk'
import * as prettier from 'prettier'
/**
 * 使用项目中的prettier配置进行格式化
 * @param text 需要格式化的文本
 * @param configFilePath 配置开始搜索的目录
 * @returns 格式化后的文本
 */
export function formatFileWithConfig(
  text: string,
  configFilePath?: string,
  parser: prettier.BuiltInParserName = 'typescript',
) {
  const _configFilePath = configFilePath || process.cwd()
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
  try {
    const configFinded = prettier.resolveConfig(_configFilePath)
    if (configFinded) {
      options = {
        ...configFinded,
        parser,
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow(
        '[WARNING] can not find perttier config file in your project, use default config instead!',
      ),
    )
  }
  return prettier.format(text, options)
}
