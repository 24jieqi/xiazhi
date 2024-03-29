"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sync = void 0;
const fs = require("fs/promises");
const chalk_1 = require("chalk");
const graphql_request_1 = require("graphql-request");
const common_1 = require("../../utils/common");
const format_1 = require("../../utils/format");
const syncDoc = (0, graphql_request_1.gql) `
  query GetAllEntries($accessKey: String!) {
    getAllEntries(accessKey: $accessKey) {
      key
      langs
      mainLang
      mainLangText
    }
  }
`;
const extractGql = (0, graphql_request_1.gql) `
  mutation extractLocalEntries(
    $accessKey: String!
    $entries: [ExtractLocalEntryItem!]!
  ) {
    extractLocalEntries(accessKey: $accessKey, entries: $entries) {
      add
      modify
      ignore
    }
  }
`;
/**
 * 同步远程词条并写入到本地
 * @param origin 远程地址
 * @param accessKey 配置的应用访问key
 * @returns
 */
async function sync(origin, accessKey) {
    if (!accessKey || !origin) {
        (0, common_1.log)(chalk_1.default.red('请检查配置文件，确保origin/accessKey正确配置'));
        return false;
    }
    const res = await (0, graphql_request_1.request)(origin, syncDoc, { accessKey });
    const data = res.getAllEntries || [];
    const rootDir = (0, common_1.getOutputPath)();
    await (0, common_1.mkRootDirIfNeeded)();
    await fs.writeFile(`${rootDir}/entries.json`, await (0, format_1.formatFileWithConfig)(JSON.stringify(data), undefined, 'json-stringify'));
    (0, common_1.log)(chalk_1.default.green('远程词条获取完毕'));
    return true;
}
exports.sync = sync;
async function upload({ origin, accessKey, entries }) {
    if (!accessKey || !origin) {
        (0, common_1.log)(chalk_1.default.red('请检查配置文件，确保origin/accessKey正确配置'));
        return;
    }
    if (!entries || !entries.length) {
        (0, common_1.log)(chalk_1.default.yellow('无可上传的词条'));
        return;
    }
    const res = await (0, graphql_request_1.request)(origin, extractGql, { accessKey, entries });
    (0, common_1.log)(chalk_1.default.green('词条已推送至远程'));
    return res;
}
exports.upload = upload;
//# sourceMappingURL=index.js.map