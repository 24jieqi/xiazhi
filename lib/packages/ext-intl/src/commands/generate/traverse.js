"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseDir = void 0;
const fs = require("fs");
const path = require("path");
const constant_1 = require("../../constant");
const common_1 = require("../../utils/common");
const transformFile_1 = require("./transformFile");
const writeDirExportEntry_1 = require("./writeDirExportEntry");
const writeOutputFile_1 = require("./writeOutputFile");
/**
 * 递归遍历文件并对中文进行抽取
 * @export
 * @param {string} pathName 当前遍历路径
 */
async function traverseDir(pathName, getUnMatchedEntries) {
    const { whiteList, extractOnly } = global['intlConfig'];
    if (fs.statSync(pathName).isFile()) {
        // 单个文件
        if (!whiteList.includes(path.extname(pathName))) {
            return;
        }
        const text = fs.readFileSync(pathName).toString();
        const result = await (0, transformFile_1.transformFile)(text, pathName);
        getUnMatchedEntries?.(result.filter(item => !item.isMatch));
        // 只有非提取模式下才生成词条文件
        if (!extractOnly) {
            (0, writeOutputFile_1.default)((0, common_1.removeDuplicatedTextList)(result).filter(item => item.isMatch));
            (0, writeDirExportEntry_1.default)();
        }
    }
    else {
        // 文件夹
        const files = fs.readdirSync(pathName);
        files.forEach(file => {
            const absPath = path.resolve(pathName, file);
            if (absPath !== constant_1.IGNORE_I18N_PATH) {
                traverseDir(absPath, getUnMatchedEntries);
            }
        });
    }
}
exports.traverseDir = traverseDir;
//# sourceMappingURL=traverse.js.map