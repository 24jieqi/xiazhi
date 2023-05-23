import { Entry } from "@prisma/client";
import fetch from "node-fetch";
import xlsx from "node-xlsx";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { serverAddress } from "../../api/constants";

type Row = string[];

interface XlsxParsedSheet {
  name: string;
  data: Row[];
}

type XlsxPasedData = XlsxParsedSheet[];

interface LangInsertItem {
  key: string;
  langs: any;
  mainLangText: string;
  prevEntry?: Entry;
}

function generateLangJSON(keys: string[], langs: string[]) {
  let result: Record<string, string> = {};
  keys.forEach((key, index) => {
    result[key] = langs[index];
  });
  return result;
}

/**
 * 排除空的Excel行
 * @param rows
 * @returns
 */
function excludeEmptyRows(rows: Row[]) {
  return rows.filter((row) => row.filter(Boolean).length > 0);
}

/**
 * 转换xlsx表格解析的原始数据为可插入到数据库中的词条数据
 * @param xlsxParsedData
 * @returns
 */
export function convertXlsxData(
  xlsxParsedData: XlsxPasedData
): LangInsertItem[] {
  if (!xlsxParsedData || !xlsxParsedData.length) {
    return [];
  }
  const result: LangInsertItem[] = [];
  for (const sheet of xlsxParsedData) {
    const rows = excludeEmptyRows(sheet.data);
    const header = rows[0].filter(Boolean);
    const langTypes = header.slice(0, header.length - 1);
    for (let i = 1; i < rows.length; i += 1) {
      const keyIndex = header.length - 1;
      console.log(header, rows[i]);
      const langJSON = generateLangJSON(langTypes, rows[i]);
      result.push({
        key: rows[i][keyIndex],
        langs: langJSON,
        mainLangText: langJSON["zh"],
      });
    }
  }
  return result;
}

/**
 * 请求远程xlsx文件并解析
 * @param url
 * @deprecated 已废弃，请使用本地上传解析
 * @returns
 */
export async function readXlsxOrigin(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("请求文件失败");
  }
  const streamPipeline = promisify(pipeline);
  const filename = path.parse(url).base;
  const filepath = path.resolve(
    __dirname,
    `../../../readXlsxOrigin/${filename}`
  );
  await streamPipeline(response.body!, fs.createWriteStream(filepath));
  const file: any = xlsx.parse(filepath);
  return file;
}

/**
 * 读取并解析本地上传后的xls文件
 */
export async function readXlsxLocal(url: string) {
  const fileName = path.parse(url).base;
  const filePath = path.resolve(
    __dirname,
    `../../../static/images/${fileName}`
  );
  return xlsx.parse(filePath) as XlsxPasedData;
}

/**
 * 对xlsx读取的词条进行分类（新增/更新）
 * @param entries
 * @param existEntries
 * @returns
 */
export function splitUpdateOrCreateEntries(
  entries: LangInsertItem[],
  existEntries: Entry[]
) {
  const result: Record<"update" | "create", LangInsertItem[]> = {
    update: [],
    create: [],
  };
  for (const entry of entries) {
    const finded = existEntries.find((item) => item.key === entry.key);
    if (finded) {
      result.update.push({
        ...entry,
        prevEntry: finded,
      });
    } else {
      result.create.push(entry);
    }
  }
  return result;
}

/**
 * 通过支持的多语言构建多语言模版
 * @param supportedLangs
 */
export function buildTemplateFile(supportedLangs: string[]) {
  // 按照行的方式写入
  const data = [[...supportedLangs, "Key"]];
  const buffer = xlsx.build([{ data, name: "sheet1", options: {} }]);
  const fileName = `${supportedLangs.join("_")}.xlsx`;
  const filePath = path.resolve(
    __dirname,
    `../../../static/images/${fileName}`
  );
  const url = `${serverAddress}/images/${fileName}`;
  if (fs.existsSync(filePath)) {
    return url;
  }
  fs.writeFileSync(filePath, buffer);
  return url;
}
