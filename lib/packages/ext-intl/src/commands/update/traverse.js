"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseDir = void 0;
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const constant_1 = require("../../constant");
const format_1 = require("../../utils/format");
const updateLangFile_1 = require("./updateLangFile");
/**
 * 递归遍历文件并对中文进行抽取
 * @export
 * @param {string} pathName 当前遍历路径
 */
async function traverseDir(file, pathName, langType) {
    if (fs.statSync(pathName).isFile()) {
        if (file === `index.${constant_1.isUseTs ? 'ts' : 'js'}`) {
            const text = fs.readFileSync(pathName).toString();
            const ast = ts.createSourceFile('', text, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS);
            let result = (0, updateLangFile_1.updateLangFile)(ast, langType);
            result = unescape(result.replace(/\\u/g, '%u'));
            fs.writeFileSync(pathName, await (0, format_1.formatFileWithConfig)(result));
        }
    }
    else {
        // 文件夹
        const files = fs.readdirSync(pathName);
        files.forEach(_file => {
            const absPath = path.resolve(pathName, _file);
            traverseDir(_file, absPath, langType);
        });
    }
}
exports.traverseDir = traverseDir;
//# sourceMappingURL=traverse.js.map