import { resolvePath } from '../../utils/common'

import type { ExtConfig } from './interface'

export const INIT_CONFIG: ExtConfig = {
  rootPath: resolvePath('./src'),
  langs: ['zh', 'en'],
  extractOnly: true,
  whiteList: ['.ts', '.tsx', '.js', '.jsx'],
  templateString: {
    funcName: 'I18N.get',
  },
  origin: '',
  accessKey: '',
}

export const CONFIG_FILE_NAME = '.extintl.json'
