import { Entry } from '@prisma/client'

interface UploadedEntryItem {
  key?: string | null | undefined
  langs: any
  mainLang: string
  mainLangText: string
}

interface GroupedEntryItem extends UploadedEntryItem {
  prev?: Entry
}

/**
 * 通过主语言文本查找
 * @param entries
 * @param mainLangText
 * @returns
 */
function findEntryByMainLangText(entries: Entry[], mainLangText: string) {
  return entries.find(entry => entry.mainLangText === mainLangText)
}

/**
 * 对上传词条尽心分组（新增/编辑/忽略）
 * @param entries
 * @param existedEntries
 * @returns
 */
export function groupUploadedEntries(
  entries: UploadedEntryItem[],
  existedEntries: Entry[],
) {
  const result: {
    add: UploadedEntryItem[]
    modify: GroupedEntryItem[]
    ignore: UploadedEntryItem[]
  } = {
    add: [],
    modify: [],
    ignore: [],
  }
  for (const entry of entries) {
    const target = findEntryByMainLangText(existedEntries, entry.mainLangText)
    if (!target) {
      result.add.push(entry)
    } else if (!target.key) {
      result.modify.push({
        ...entry,
        prev: target,
      })
    } else {
      result.ignore.push(entry)
    }
  }
  return result
}
