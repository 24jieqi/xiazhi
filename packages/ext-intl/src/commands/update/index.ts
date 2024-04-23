import fs from 'fs/promises'

import { resolvePath } from '../../utils/common'
import { readEntryFile } from '../../utils/file'
import type { ExtConfig } from '../config/interface'

import { updateLangFile } from './updateLangFile'

/**
 * 更新本地词条文件（和远程进行同步）
 * @param config
 * @returns
 */
export async function update(config: ExtConfig) {
  const entries = await readEntryFile()
  const langRootPath = resolvePath('./src/i18n/langs')
  if (!(await fs.stat(langRootPath)).isDirectory()) {
    return
  }
  const langFileNameList = await fs.readdir(langRootPath)
  for (const langFileName of langFileNameList) {
    if (langFileName === config.langs![0]) {
      continue
    }
    await updateLangFile(langRootPath, langFileName, entries)
  }
}
