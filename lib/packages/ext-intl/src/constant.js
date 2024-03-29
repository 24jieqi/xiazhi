"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputPath = exports.isUseTs = exports.IGNORE_I18N_PATH = exports.WEB_DEPENDENCIES = exports.APP_DEPENDENCIES = exports.INIT_VERSION_NUMBER = exports.USE_STATEMENT = exports.IMPORT_STATEMENT = exports.DEFAULT_LANGUAGE = exports.CONFIG_FILE_NAME = exports.DOUBLE_BYTE_REGEX = exports.TAB = void 0;
const common_1 = require("./utils/common");
exports.TAB = ' ';
exports.DOUBLE_BYTE_REGEX = /[^\x00-\xff]/g;
exports.CONFIG_FILE_NAME = '.extintl.json';
exports.DEFAULT_LANGUAGE = 'zh-CN';
exports.IMPORT_STATEMENT = `import { useI18n } from '@/i18n/context';\n`;
exports.USE_STATEMENT = 'const { I18N } = useI18n();\n';
exports.INIT_VERSION_NUMBER = 1;
/* APP依赖项 */
exports.APP_DEPENDENCIES = {
    dependencies: ['@react-native-async-storage/async-storage'],
    devDependencies: [],
};
/* WEB依赖项 */
exports.WEB_DEPENDENCIES = {
    dependencies: [],
    devDependencies: [],
};
exports.IGNORE_I18N_PATH = (0, common_1.resolvePath)('./src/i18n');
// eslint-disable-next-line react-hooks/rules-of-hooks
exports.isUseTs = (0, common_1.useTs)();
exports.outputPath = (0, common_1.getOutputPath)();
//# sourceMappingURL=constant.js.map