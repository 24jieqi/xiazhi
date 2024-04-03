import type { DependenciesType } from './interface'
import { getOutputPath, resolvePath, useTs } from './utils/common'

export const TAB = ' '
export const DOUBLE_BYTE_REGEX = /[^\x00-\xff]/g
export const CONFIG_FILE_NAME = '.extintl.json'
export const DEFAULT_LANGUAGE = 'zh-CN'

export const IMPORT_STATEMENT = `import { useI18n } from '@/i18n/context';\n`
export const IMPORT_CONTEXT_STATEMENT = `import { I18NContextWrapper } from '@/i18n/context';\n`
export const USE_STATEMENT = 'const { I18N } = useI18n();'

export const INIT_VERSION_NUMBER = 1

/* APP依赖项 */
export const APP_DEPENDENCIES: DependenciesType = {
  dependencies: ['@react-native-async-storage/async-storage'],
  devDependencies: [],
}

/* WEB依赖项 */
export const WEB_DEPENDENCIES: DependenciesType = {
  dependencies: [],
  devDependencies: [],
}

export const IGNORE_I18N_PATH = resolvePath('./src/i18n')

// eslint-disable-next-line react-hooks/rules-of-hooks
export const isUseTs = useTs()

export const outputPath = getOutputPath()
