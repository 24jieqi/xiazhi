"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const chalk_1 = require("chalk");
const ts = require("typescript");
const constant_1 = require("../../constant");
const common_1 = require("../../utils/common");
const format_1 = require("../../utils/format");
function getText(textObj, lang) {
    const { langs } = global['intlConfig'];
    const isMainLang = lang === langs[0];
    const text = isMainLang ? textObj.value : textObj[lang] || '';
    return text
        .replace(/;/g, '')
        .replace(/[\r\n]/g, '')
        .replace(/\$/g, '')
        .replace(/[`'"]/g, '');
}
/**
 * 读取并更新i18n文件
 * @param textArr 提取词条数组
 * @param filePath 读取文件路径
 * @param lang 语言
 */
async function readAndUpdateI18nFile(textArr, filePath, lang) {
    let entryObj;
    const promiseText = fs.readFileSync(filePath);
    const ast = ts.createSourceFile('', promiseText.toString(), ts.ScriptTarget.ES2015, true, constant_1.isUseTs ? ts.ScriptKind.TS : ts.ScriptKind.JS);
    const factory = ts.factory;
    const printer = ts.createPrinter({});
    const transformer = (context) => (rootNode) => {
        function visit(node) {
            switch (node.kind) {
                case ts.SyntaxKind.ObjectLiteralExpression: {
                    const { properties, parent } = node;
                    if (parent.kind === ts.SyntaxKind.ExportAssignment) {
                        const propertyAssignment = properties.filter(property => property.kind === ts.SyntaxKind.PropertyAssignment);
                        if (propertyAssignment?.length > 0) {
                            // 读取词条信息
                            entryObj = propertyAssignment.reduce((pre, curr) => {
                                const key = curr.name.escapedText;
                                const value = curr.initializer
                                    .getText()
                                    .replace(/'|"/g, '');
                                return {
                                    ...pre,
                                    [key]: value,
                                };
                            }, {});
                            const propertyArray = textArr
                                .filter(item => !entryObj?.[item.key])
                                .map(item => {
                                const property = factory.createPropertyAssignment(factory.createIdentifier(`${item.key}`), factory.createStringLiteral(item?.[lang]?.replace(/[\r\n;]/g, '') || ''));
                                // 添加注释
                                const commentProperty = ts.addSyntheticLeadingComment(property, ts.SyntaxKind.MultiLineCommentTrivia, `*\n* ${item.value.replace(/[\r\n;]/g, '')}\n`, false);
                                return commentProperty;
                            });
                            return factory.createObjectLiteralExpression([
                                ...propertyArray,
                                ...propertyAssignment,
                            ]);
                        }
                    }
                    break;
                }
            }
            return ts.visitEachChild(node, visit, context);
        }
        return ts.visitNode(rootNode, visit);
    };
    const transformedFile = ts.transform(ast, [transformer]).transformed[0];
    const newEntryArr = textArr.filter(item => !entryObj?.[item.key]);
    if (newEntryArr.length) {
        const file = printer.printFile(transformedFile);
        const formateFile = (0, common_1.unicodeToChar)(file);
        fs.writeFileSync(filePath, await (0, format_1.formatFileWithConfig)(formateFile), {
            encoding: 'utf-8',
        });
    }
}
/**
 * 首次写入i18n文件
 * @param textArr 提取词条数组
 * @param filePath 读取文件路径
 * @param lang 语言
 */
async function firstWriteI18nFile(textArr, filePath, lang) {
    let textStr = textArr
        .map(text => `${text.comment.endsWith('\n') ? text.comment : `${text.comment}\n`}${text.key}: '${getText(text, lang)}',`)
        .join('\n');
    textStr = 'export default {\n' + textStr + '\n}';
    try {
        textStr = await (0, format_1.formatFileWithConfig)(textStr);
    }
    catch (error) { }
    try {
        fs.writeFileSync(filePath, textStr);
    }
    catch (error) {
        (0, common_1.log)(chalk_1.default.red(`[ERROR] ${error}`));
    }
}
/**
 * 将提取结果写入到文件
 * @param textArr 提取词条数组
 */
function writeOutputFile(textArr, lang) {
    const extname = constant_1.isUseTs ? '.ts' : '.js';
    const filePath = `${constant_1.outputPath}/langs/${lang}/index${extname}`;
    // 判断文件是否存在
    const exist = fs.existsSync(filePath);
    if (!exist) {
        firstWriteI18nFile(textArr, filePath, lang);
    }
    else {
        readAndUpdateI18nFile(textArr, filePath, lang);
    }
}
/**
 * 写入扫描结果到多个文件
 * @param textArr 扫描到的词条数组
 */
function writeMultiOutFile(textArr) {
    const { langs } = global['intlConfig'];
    if (textArr.length === 0)
        return;
    for (const lang of langs) {
        writeOutputFile(textArr, lang);
    }
}
exports.default = writeMultiOutFile;
//# sourceMappingURL=writeOutputFile.js.map