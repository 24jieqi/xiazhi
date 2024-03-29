"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const fs = require("fs/promises");
const path = require("path");
const common_1 = require("../../utils/common");
const file_1 = require("../../utils/file");
const traverse_1 = require("./traverse");
/**
 * 更新本地已经维护好的词条信息
 */
async function update(mainLangType) {
    const entries = await (0, file_1.readEntryFile)();
    global['local_entries'] = entries;
    const langRootPath = (0, common_1.resolvePath)('./src/i18n/langs');
    const stat = await fs.stat(langRootPath);
    if (stat.isDirectory()) {
        const versionRoot = await fs.readdir(langRootPath);
        if (!versionRoot.length) {
            return;
        }
        for (const f of versionRoot) {
            const absPath = path.resolve(langRootPath, f);
            const fStat = await fs.stat(absPath);
            if (!fStat.isDirectory()) {
                continue;
            }
            const langTypeDirNameList = await fs.readdir(absPath);
            for (const langType of langTypeDirNameList) {
                if (langType !== mainLangType) {
                    (0, traverse_1.traverseDir)(langType, path.resolve(absPath, langType), langType);
                }
            }
        }
    }
}
exports.update = update;
//# sourceMappingURL=index.js.map