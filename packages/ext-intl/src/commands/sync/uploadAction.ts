import chalk from 'chalk'
import inquirer from 'inquirer'

import type { MatchText } from '../../interface'
import { log } from '../../utils/common'
import type { ExtConfig } from '../config/interface'

import type { UploadConfig, UploadEntryItem } from './index'
import { upload } from './index'

interface UploadActionConfig extends Omit<UploadConfig, 'entries'> {
  unMatchedList: MatchText[]
}

/**
 * 词条上报连贯动作（询问、上传、上传结果展示）
 * @param config
 */
export async function uploadAction(config: UploadActionConfig) {
  if (!config?.unMatchedList) {
    return
  }
  const { langs } = global['intlConfig'] as ExtConfig
  const mainLang = langs![0]
  const answer = await inquirer.prompt<{ shouldUpload: boolean }>([
    {
      type: 'confirm',
      name: 'shouldUpload',
      message: '检测到有未翻译的词条，是否推送至远程',
    },
  ])
  if (answer.shouldUpload) {
    // 1. 格式化词条数据
    const entries: UploadEntryItem[] = config.unMatchedList.map(item => ({
      langs: {
        [mainLang]: item.value,
      },
      mainLang,
      mainLangText: item.value,
      key: item.key,
    }))
    // 2. 词条上传
    const res = await upload({
      origin: config.origin,
      accessKey: config.accessKey,
      entries,
    })
    if (!res) {
      return
    }
    const statistics = res.uploadEntries
    log(
      chalk.green(
        `[INFO] 已成功完成${config.unMatchedList.length}个词条的推送，结果如下：`,
      ),
    )
    log(chalk.green(`新增：${statistics?.add}`))
    log(chalk.green(`修改：${statistics?.modify}`))
    log(chalk.green(`忽略：${statistics?.ignore}`))
  }
}
