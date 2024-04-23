import fs from 'fs/promises'

import chalk from 'chalk'
import { request, gql } from 'graphql-request'

import type { OriginEntryItem } from '../../interface'
import { getOutputPath, log, mkRootDirIfNeeded } from '../../utils/common'
import { formatFileWithConfig } from '../../utils/format'

const syncDoc = gql`
  query GetEntries($ak: String!) {
    getEntries(ak: $ak) {
      createdAt
      id
      key
      langs
      mainLang
      mainLangText
    }
  }
`

const uploadDoc = gql`
  mutation uploadEntries($ak: String!, $entries: [ExtractEntryItem!]!) {
    uploadEntries(ak: $ak, entries: $entries) {
      add
      ignore
      modify
    }
  }
`

/**
 * 同步远程词条并写入到本地
 * @param origin 远程地址
 * @param accessKey 配置的应用访问key
 * @returns { Promise<boolean> }
 */
export async function sync(
  origin: string,
  accessKey: string,
): Promise<boolean> {
  try {
    const res = await request<{ getEntries: OriginEntryItem[] }>(
      origin,
      syncDoc,
      { ak: accessKey },
    )
    const data: OriginEntryItem[] = res.getEntries || []
    const basePath = getOutputPath()
    await mkRootDirIfNeeded()
    await fs.writeFile(
      `${basePath}/entries.json`,
      await formatFileWithConfig(
        JSON.stringify(data),
        undefined,
        'json-stringify',
      ),
    )
    log(chalk.green('[INFO] 远程词条获取完毕'))
    return true
  } catch {
    return false
  }
}

export type UploadEntryItem = {
  key?: string
  langs?: any
}

export interface UploadConfig {
  origin: string
  accessKey: string
  entries: UploadEntryItem[]
}

interface UploadResponse {
  add: number
  modify: number
  ignore: number
}

/**
 * 词条上报
 * @param config
 * @returns
 */
export async function upload({ origin, accessKey, entries }: UploadConfig) {
  if (!accessKey || !origin) {
    log(chalk.red('[ERROR] 请检查配置文件，确保origin/accessKey正确配置'))
    return
  }
  if (!entries || !entries.length) {
    log(chalk.yellow('[WARNNING] 无可上传的词条'))
    return
  }
  const res = await request<{ uploadEntries: UploadResponse }>(
    origin,
    uploadDoc,
    { ak: accessKey, entries },
  )
  log(chalk.green('[INFO] 词条已推送至远程'))
  return res
}
