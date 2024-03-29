"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_FILE_NAME = exports.INIT_CONFIG = void 0;
const common_1 = require("../../utils/common");
exports.INIT_CONFIG = {
    rootPath: (0, common_1.resolvePath)('./src'),
    langs: ['zh', 'en'],
    extractOnly: true,
    whiteList: ['.ts', '.tsx', '.js', '.jsx'],
    templateString: {
        funcName: 'I18N.get',
    },
    origin: '',
    accessKey: '',
};
exports.CONFIG_FILE_NAME = '.extintl.json';
//# sourceMappingURL=constant.js.map