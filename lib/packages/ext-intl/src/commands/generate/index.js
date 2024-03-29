"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const fs = require("fs/promises");
const chalk_1 = require("chalk");
const constant_1 = require("../../constant");
const intl_1 = require("../../intl");
const common_1 = require("../../utils/common");
const file_1 = require("../../utils/file");
const traverse_1 = require("./traverse");
const writeTotalExportEntry_1 = require("./writeTotalExportEntry");
async function start(config) {
    try {
        global['intlConfig'] = {
            ...config,
        };
        const entries = await (0, file_1.readEntryFile)();
        global['local_entries'] = entries;
        const { langs, rootPath, extractOnly } = config;
        (0, common_1.log)('[INFO] 开始提取...');
        (0, common_1.time)('[INFO] 提取用时');
        const unMatchedList = [];
        // 1. 创建多语言根目录&此次提取的词条目录
        try {
            await (0, common_1.mkRootDirIfNeeded)();
            if (!extractOnly) {
                for (const lang of langs) {
                    await fs.mkdir(`${constant_1.outputPath}/langs/${lang}`, {
                        recursive: true,
                    });
                }
            }
        }
        catch (error) {
            const code = error.code;
            if (code && code !== 'EEXIST') {
                throw error;
            }
        }
        // 2. 遍历文件（提取词条/写入多语言模版等）
        (0, traverse_1.traverseDir)(rootPath, _entries => {
            unMatchedList.push(...(0, common_1.removeDuplicatedText)(unMatchedList, _entries));
        });
        if (!extractOnly) {
            // 3. 写入词条入口文件
            (0, writeTotalExportEntry_1.default)();
            // 4. 如果是非提取模式，写入基于kiwi-intl的模版文件
            await (0, intl_1.default)();
        }
        (0, common_1.timeEnd)('[INFO] 提取用时');
    }
    catch (error) {
        (0, common_1.log)(chalk_1.default.red('[ERROR]: ', error));
    }
}
exports.start = start;
//# sourceMappingURL=index.js.map