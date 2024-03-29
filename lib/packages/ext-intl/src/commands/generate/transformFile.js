"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformFile = void 0;
const ts = require("typescript");
const chinese_1 = require("../../transformer/chinese");
const using_1 = require("../../transformer/using");
const addImport_1 = require("../../utils/addImport");
const file_1 = require("../../utils/file");
/**
 * 在源文件中查找中文词条（替换）
 * @param code 源代码
 * @param fileName 当前文件路径名
 */
async function transformFile(code, fileName) {
    const { extractOnly } = global['intlConfig'];
    const matches = [];
    const ast = ts.createSourceFile('', code, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TSX);
    const transformers = [(0, chinese_1.default)(matches, fileName, code)];
    if (!extractOnly) {
        transformers.push(using_1.usingTransformer);
    }
    let transformedFile = ts.transform(ast, transformers)
        .transformed[0];
    if (!extractOnly && matches.length > 0) {
        transformedFile = (0, addImport_1.addImportToFile)(transformedFile, code);
        await (0, file_1.saveFile)(transformedFile, fileName);
    }
    return matches;
}
exports.transformFile = transformFile;
//# sourceMappingURL=transformFile.js.map