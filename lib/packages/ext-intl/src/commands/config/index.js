"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfig = exports.writeConfigFile = exports.readConfigFile = exports.getMergedConfig = exports.generateConfigFile = void 0;
const fs = require("fs/promises");
const chalk_1 = require("chalk");
const common_1 = require("../../utils/common");
const format_1 = require("../../utils/format");
const constant_1 = require("./constant");
const utils_1 = require("./utils");
/**
 * 生成配置文件
 */
async function generateConfigFile(override = false) {
    try {
        await fs.access((0, common_1.resolvePath)(constant_1.CONFIG_FILE_NAME));
        if (!override) {
            (0, common_1.log)(chalk_1.default.red('[WARNING] 本地文件已存在'));
        }
        else {
            await writeConfigFile();
            (0, common_1.log)(chalk_1.default.green('[INFO] 配置文件生成成功, 请修改后再次运行'));
            process.exit();
        }
    }
    catch (error) {
        await writeConfigFile();
        (0, common_1.log)(chalk_1.default.green('[INFO] 配置文件生成成功, 请修改后再次运行'));
        process.exit();
    }
}
exports.generateConfigFile = generateConfigFile;
/**
 * 传入config 并且和默认config进行合并 输出合并后的结果 如果没有config 则返回null
 * @param config 传入的config
 * @returns
 */
function getMergedConfig(config) {
    if (!config ||
        (0, common_1.isAndEmpty)(config, 'Object', value => Object.keys(value).length === 0)) {
        return null;
    }
    const diffResult = (0, utils_1.diffConfig)(config);
    if (Object.keys(diffResult).length) {
        (0, common_1.log)(`[WARNING] ${chalk_1.default.yellow('以下配置项未设置，将会使用默认配置')}`);
        (0, common_1.log)(`${chalk_1.default.yellow(JSON.stringify(diffResult, null, 2))}`);
    }
    return {
        ...constant_1.INIT_CONFIG,
        ...config,
    };
}
exports.getMergedConfig = getMergedConfig;
/**
 * 读取本地配置文件
 * @returns
 */
async function readConfigFile() {
    const [data, error] = await (0, common_1.handle)(fs.readFile((0, common_1.resolvePath)(constant_1.CONFIG_FILE_NAME), { encoding: 'utf-8' }));
    if (error && error.code !== 'ENOENT') {
        throw new Error(error.message || '读取配置文件失败');
    }
    return JSON.parse(data || '{}');
}
exports.readConfigFile = readConfigFile;
/**
 * 写默认配置到文件
 */
async function writeConfigFile() {
    await fs.writeFile((0, common_1.resolvePath)(constant_1.CONFIG_FILE_NAME), await (0, format_1.formatFileWithConfig)(JSON.stringify(constant_1.INIT_CONFIG), undefined, 'json-stringify'));
}
exports.writeConfigFile = writeConfigFile;
/**
 * 检查并返回配置，如果没有则写入默认配置到文件
 * 检查配置的流程：
 * 1. 如果传入了config，则直接使用config以及默认配置合并
 * 2. 读取本地文件配置 合并后返回
 * 3. 以默认配置生成配置文件并结束进程
 */
async function checkConfig(config) {
    try {
        // 如果传入了配置 则返回后合并
        if (config) {
            return getMergedConfig(config);
        }
        // 读取本地文件合并后返回
        const localConfig = await readConfigFile();
        if (localConfig) {
            return getMergedConfig(localConfig);
        }
        // 以默认值生成配置文件并结束
        await generateConfigFile();
    }
    catch (e) {
        (0, common_1.log)(chalk_1.default.red(`[ERROR] ${e.message}`));
    }
}
exports.checkConfig = checkConfig;
//# sourceMappingURL=index.js.map