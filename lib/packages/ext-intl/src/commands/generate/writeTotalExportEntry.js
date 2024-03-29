"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const chalk_1 = require("chalk");
const constant_1 = require("../../constant");
const common_1 = require("../../utils/common");
const format_1 = require("../../utils/format");
/**
 * 多版本的统一入口文件导出
 */
async function writeTotalExportEntry() {
    const { langs } = global['intlConfig'];
    const basePath = `${constant_1.outputPath}/langs`;
    const extname = '.' + (constant_1.isUseTs ? 'ts' : 'js');
    const dirObj = {};
    let content = '';
    try {
        for (const lang of langs) {
            const dir = fs.readdirSync(`${basePath}/${lang}`);
            if (dir.length) {
                content += `import ${lang} from './${lang}/_index';`;
                dirObj[lang] = dir;
            }
        }
        for (const lang of langs) {
            content += `export const ${lang.toUpperCase()} = ${dirObj[lang]?.length ? `{ ...${lang} };` : '{ };'} `;
        }
    }
    catch (error) { }
    content = await (0, format_1.formatFileWithConfig)(content);
    // 写入到文件
    const entryPath = path.resolve(basePath, `index${extname}`);
    try {
        fs.writeFileSync(entryPath, content);
    }
    catch (error) {
        (0, common_1.log)(chalk_1.default.red(`[ERROR] 文件写入失败 ${entryPath}`));
    }
}
exports.default = writeTotalExportEntry;
//# sourceMappingURL=writeTotalExportEntry.js.map