"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFileWithConfig = void 0;
const chalk_1 = require("chalk");
const prettier = require("prettier");
/**
 * 使用项目中的prettier配置进行格式化
 * @param text 需要格式化的文本
 * @param configFilePath 配置开始搜索的目录
 * @returns 格式化后的文本
 */
function formatFileWithConfig(text, configFilePath, parser = 'typescript') {
    const _configFilePath = configFilePath || process.cwd();
    let options = {
        parser,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
        semi: false,
        useTabs: true,
        proseWrap: 'never',
    };
    try {
        const configFinded = prettier.resolveConfig(_configFilePath);
        if (configFinded) {
            options = {
                ...configFinded,
                parser,
            };
        }
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(chalk_1.default.yellow('[WARNING] can not find perttier config file in your project, use default config instead!'));
    }
    return prettier.format(text, options);
}
exports.formatFileWithConfig = formatFileWithConfig;
//# sourceMappingURL=format.js.map