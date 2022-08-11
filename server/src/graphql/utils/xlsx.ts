import { Entry, LanguageType } from "@prisma/client"
import fetch from "node-fetch";
import xlsx from "node-xlsx";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

type Row = string[]

interface XlsxParsedSheet {
  name: string
  data: Row[]
}

type XlsxPasedData = XlsxParsedSheet[]

interface LangInsertItem {
  key: string
  langs: any
  mainLangText: string
  public: boolean
  prevEntry?: Entry
}

function generateLangJSON(keys: string[], langs: string[]) {
  let result: Record<string, string> = {}
  keys.forEach((key, index) => {
    result[key] = langs[index]
  })
  return result
}

/**
 * 排除空的Excel行
 * @param rows 
 * @returns 
 */
function excludeEmptyRows(rows: Row[]) {
  return rows.filter(row => row.filter(Boolean).length > 0)
}

/**
 * 转换xlsx表格解析的原始数据为可插入到数据库中的词条数据
 * @param xlsxParsedData 
 * @returns 
 */
export function convertXlsxData(xlsxParsedData: XlsxPasedData): LangInsertItem[] {
  if (!xlsxParsedData || !xlsxParsedData.length) {
    return []
  }
  const result: LangInsertItem[] = []
  for (const sheet of xlsxParsedData) {
    const rows = excludeEmptyRows(sheet.data)
    const header = rows[0]
    const langTypes = header.slice(0, header.length - 1)
    for (let i= 1; i < rows.length; i+=1) {
      const keyIndex = header.length - 1
      const langJSON = generateLangJSON(langTypes, rows[i])
      result.push({
        key: rows[i][keyIndex],
        langs: langJSON,
        mainLangText: langJSON[LanguageType.CHINESE],
        public: false
      })
    }
  }
  return result
}

/**
 * 请求远程xlsx文件并解析
 * @param url 
 * @returns 
 */
export async function readXlsxOrigin(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('请求文件失败')
  }
  const streamPipeline = promisify(pipeline)
  const filename = path.parse(url).base
  const filepath = path.resolve(__dirname, `../../../views/${filename}`)
  await streamPipeline(response.body!, fs.createWriteStream(filepath))
  const file: any = xlsx.parse(filepath)
  return file
}

/**
 * 对xlsx读取的词条进行分类（新增/更新）
 * @param entries 
 * @param existEntries 
 * @returns 
 */
export function splitUpdateOrCreateEntries(entries: LangInsertItem[], existEntries: Entry[]) {
  const result: Record<'update' | 'create', LangInsertItem[]> = {
    update: [],
    create: []
  }
  for (const entry of entries) {
    const finded = existEntries.find(item => item.key === entry.key)
    if (finded) {
      result.update.push({
        ...entry,
        prevEntry: finded
      })
    } else {
      result.create.push(entry)
    }
  }
  return result
}
