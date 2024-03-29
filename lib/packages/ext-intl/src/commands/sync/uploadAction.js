"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAction = void 0;
const chalk_1 = require("chalk");
const inquirer_1 = require("inquirer");
const common_1 = require("../../utils/common");
const index_1 = require("./index");
async function uploadAction(config) {
    const { langs } = global['intlConfig'];
    const mainLang = langs[0];
    if (config.unMatchedList && config.unMatchedList.length > 0) {
        const answer = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'shouldUpload',
                message: '检测到有未翻译的词条，是否推送至远程',
            },
        ]);
        if (answer.shouldUpload) {
            const entries = config.unMatchedList.map(item => ({
                langs: {
                    [mainLang]: item.value,
                },
                mainLang,
                mainLangText: item.value,
                key: item.key,
            }));
            const res = await (0, index_1.upload)({
                origin: config.origin,
                accessKey: config.accessKey,
                entries,
            });
            const statistics = res.extractLocalEntries;
            (0, common_1.log)(chalk_1.default.green(`已成功完成${config.unMatchedList.length}个词条的推送，结果如下：`));
            (0, common_1.log)(chalk_1.default.green(`新增：${statistics?.add}`));
            (0, common_1.log)(chalk_1.default.green(`修改：${statistics?.modify}`));
            (0, common_1.log)(chalk_1.default.green(`忽略：${statistics?.ignore}`));
        }
    }
}
exports.uploadAction = uploadAction;
//# sourceMappingURL=uploadAction.js.map