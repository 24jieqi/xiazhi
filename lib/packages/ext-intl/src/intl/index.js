"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChildProcess = require("child_process");
const fs = require("fs");
const promiseFs = require("fs/promises");
const chalk_1 = require("chalk");
const constant_1 = require("../constant");
const common_1 = require("../utils/common");
const format_1 = require("../utils/format");
const app_storage_1 = require("./app-storage");
const context_1 = require("./context");
const i18n_1 = require("./i18n");
const typing_1 = require("./typing");
const web_storage_1 = require("./web-storage");
/**
 * 写入i18n模版文件
 */
async function writeI18nTemplateFile() {
    const { langs } = global['intlConfig'];
    const native = (0, common_1.isNative)();
    // 获取模板文件内容
    const i18nStr = (0, i18n_1.default)(langs);
    const typingStr = (0, typing_1.default)(langs);
    const contextStr = (0, context_1.default)(native);
    const storageTemplate = native ? app_storage_1.default : web_storage_1.default;
    try {
        // 下载依赖项
        await downloadAllDependencies(native ? constant_1.APP_DEPENDENCIES : constant_1.WEB_DEPENDENCIES);
    }
    catch (error) { }
    // 写入模版文件
    writeFileIfNotExisted(`${constant_1.outputPath}/storage.ts`, storageTemplate);
    writeFileIfNotExisted(`${constant_1.outputPath}/index.ts`, i18nStr);
    writeFileIfNotExisted(`${constant_1.outputPath}/typing.ts`, typingStr);
    writeFileIfNotExisted(`${constant_1.outputPath}/context.tsx`, contextStr);
}
/**
 * 写入单个文件，如果文件不存在的话
 */
async function writeFileIfNotExisted(filePath, content) {
    if (fs.existsSync(filePath)) {
        (0, common_1.log)(chalk_1.default.yellow(`[WARNING] 多语言模版: ${filePath} 已存在，跳过写入.`));
        return;
    }
    try {
        fs.writeFileSync(filePath, await (0, format_1.formatFileWithConfig)(content));
    }
    catch (error) {
        (0, common_1.log)(chalk_1.default.red(`[ERROR] 写入多语言模版失败: ${error.message}`));
    }
}
/**
 * 下载依赖包
 */
async function downloadAllDependencies({ dependencies, devDependencies, }) {
    if (dependencies.length > 0 || devDependencies.length > 0) {
        const packagePath = (0, common_1.resolvePath)('package.json');
        const res = await promiseFs.readFile(packagePath, 'utf8');
        const obj = JSON.parse(res);
        const dependenciesArray = dependencies.filter(item => !obj?.['dependencies']?.[item]);
        const devDependenciesArray = devDependencies.filter(item => obj?.['devDependencies']?.[item]);
        if (dependenciesArray.length > 0) {
            await execDownload(dependenciesArray, '');
        }
        if (devDependenciesArray.length > 0) {
            await execDownload(devDependenciesArray, '--dev');
        }
        return Promise.resolve();
    }
    return Promise.resolve();
}
/**
 * 执行下载
 */
function execDownload(packageArr, modifier) {
    return new Promise(resolve => {
        const packageStr = packageArr.join(' ');
        (0, common_1.log)(chalk_1.default.green(`[INFO] 开始下载${packageStr}`));
        const child = ChildProcess.exec(`yarn add ${packageStr} ${modifier}`, {
            timeout: 30000,
        }, childErr => {
            if (!childErr) {
                (0, common_1.log)(chalk_1.default.green(`[INFO] ${packageStr}下载成功`));
            }
            else {
                (0, common_1.log)(chalk_1.default.red(`[ERROR] ${packageStr}下载失败，请重新下载`));
            }
            resolve('');
        });
        child?.stdout?.on('data', data => {
            (0, common_1.log)(data);
        });
        child?.stderr?.on('data', err => {
            (0, common_1.log)(err);
        });
    });
}
exports.default = writeI18nTemplateFile;
//# sourceMappingURL=index.js.map