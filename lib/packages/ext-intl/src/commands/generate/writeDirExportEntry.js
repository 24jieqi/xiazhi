"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const chalk_1 = require("chalk");
const constant_1 = require("../../constant");
const common_1 = require("../../utils/common");
const format_1 = require("../../utils/format");
/**
 * 给每个文件夹写入一个导出入口`index.js/ts`
 */
async function writeDirExportEntry() {
    const { langs } = global['intlConfig'];
    const extname = '.' + (constant_1.isUseTs ? 'ts' : 'js');
    // 处理文件路径
    for (const lang of langs) {
        const filePath = `${constant_1.outputPath}/langs/${lang}/index${extname}`;
        const exportFilePath = `${constant_1.outputPath}/langs/${lang}/_index${extname}`;
        if (!fs.existsSync(filePath)) {
            return;
        }
        if (!fs.existsSync(exportFilePath)) {
            try {
                const content = `import index from './index'
        export default { index }`;
                fs.writeFileSync(exportFilePath, await (0, format_1.formatFileWithConfig)(content));
            }
            catch (error) {
                (0, common_1.log)(chalk_1.default.red(`[ERROR] ${error}`));
            }
        }
    }
}
exports.default = writeDirExportEntry;
//# sourceMappingURL=writeDirExportEntry.js.map