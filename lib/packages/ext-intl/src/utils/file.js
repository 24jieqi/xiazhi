"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = exports.readEntryFile = void 0;
const fs = require("fs/promises");
const chalk_1 = require("chalk");
const ts = require("typescript");
const common_1 = require("./common");
/**
 * 读取本地词条文件
 * @returns
 */
async function readEntryFile() {
    const entryFilePath = (0, common_1.getOutputPath)();
    const [data, error] = await (0, common_1.handle)(fs.readFile(`${entryFilePath}/entries.json`, { encoding: 'utf-8' }));
    if (error && error.code !== 'ENOENT') {
        throw new Error(error.message || '读取词条文件失败');
    }
    return JSON.parse(data || '{}');
}
exports.readEntryFile = readEntryFile;
/**
 * 保存文件
 * @param ast 文件的sourceFile
 * @param filePath 文件的绝对路径
 */
async function saveFile(ast, filePath) {
    const printer = ts.createPrinter();
    const fileText = printer.printFile(ast);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, error] = await (0, common_1.handle)(fs.writeFile(filePath, fileText));
    if (error) {
        (0, common_1.log)(chalk_1.default.red(`[ERROR] 无法生成文件，请手动替换: ${filePath}`));
    }
}
exports.saveFile = saveFile;
//# sourceMappingURL=file.js.map