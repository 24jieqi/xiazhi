import * as chalk from 'chalk'
import * as inquirer from 'inquirer'

import type { MatchText } from '../../interface'
import { log } from '../../utils/common'
import type { ExtConfig } from '../config/interface'

import type { UploadConfig, UploadEntryItem } from './index'
import { upload } from './index'

interface UploadActionConfig extends Omit<UploadConfig, 'entries'> {
  unMatchedList: MatchText[]
}

export async function uploadAction(config: UploadActionConfig) {
  const { langs } = global['intlConfig'] as ExtConfig
  const mainLang = langs![0]
  if (config.unMatchedList && config.unMatchedList.length > 0) {
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldUpload',
        message: '检测到有未翻译的词条，是否推送至远程',
      },
    ])
    if (answer.shouldUpload) {
      const entries: UploadEntryItem[] = config.unMatchedList.map(item => ({
        langs: {
          [mainLang]: item.value,
        },
        mainLang,
        mainLangText: item.value,
        key: item.key,
      }))

      const res = await upload({
        origin: config.origin,
        accessKey: config.accessKey,
        entries,
      })
      const statistics = res!.extractLocalEntries
      log(
        chalk.green(
          `已成功完成${config.unMatchedList.length}个词条的推送，结果如下：`,
        ),
      )
      log(chalk.green(`新增：${statistics?.add}`))
      log(chalk.green(`修改：${statistics?.modify}`))
      log(chalk.green(`忽略：${statistics?.ignore}`))
    }
  }
}
