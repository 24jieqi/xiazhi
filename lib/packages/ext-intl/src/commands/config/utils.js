"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffConfig = void 0;
const constant_1 = require("./constant");
/**
 * 对传入的配置和默认配置进行diff 返回未配置的字段
 * @param config
 * @returns
 */
function diffConfig(config) {
    const allKeys = Object.keys(constant_1.INIT_CONFIG);
    const customConfigKeys = Object.keys(config);
    const diffResult = {};
    for (const key of allKeys) {
        if (!customConfigKeys.includes(key)) {
            diffResult[key] = constant_1.INIT_CONFIG[key];
        }
    }
    return diffResult;
}
exports.diffConfig = diffConfig;
//# sourceMappingURL=utils.js.map