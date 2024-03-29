#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = require("../package.json");
const _1 = require(".");
const program = new commander_1.Command();
program
    .name('ext-intl')
    .description('xiazhi多语言脚本')
    .version(package_json_1.default.version);
program
    .command('sync')
    .description('同步远程词库数据')
    .action(async () => {
    const localConfig = await (0, _1.readConfigFile)();
    const config = (0, _1.getMergedConfig)(localConfig);
    await (0, _1.sync)(config.origin, config.accessKey);
});
program
    .command('start')
    .description('开启一次完整的多语言提取')
    .option('-e, --env <char>', '运行环境', 'BROWSER')
    .action(async () => {
    const config = await (0, _1.checkConfig)();
    const isSyncSuccess = await (0, _1.sync)(config.origin, config.accessKey);
    if (isSyncSuccess) {
        await (0, _1.start)(config);
    }
});
program
    .command('update')
    .description('同步远程词库数据并更新本地词条')
    .action(async () => {
    const localConfig = await (0, _1.readConfigFile)();
    const config = (0, _1.getMergedConfig)(localConfig);
    const isSyncSuccess = await (0, _1.sync)(config.origin, config.accessKey);
    if (isSyncSuccess) {
        await (0, _1.update)(config.langs[0]);
    }
});
program
    .command('config')
    .description('配置脚本')
    .option('-o, --override', '覆盖当前已经存在的配置')
    .action(async (options) => {
    await (0, _1.generateConfigFile)(options.override);
});
program.parse();
//# sourceMappingURL=client.js.map