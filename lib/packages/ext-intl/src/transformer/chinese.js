"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEntryKey = void 0;
const pinyin_pro_1 = require("pinyin-pro");
const ts = require("typescript");
const constant_1 = require("../constant");
const common_1 = require("../utils/common");
function generateEntryKey(langText) {
    return langText
        .split(' ')
        .map((word, index) => {
        if (index === 0) {
            return word;
        }
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    })
        .join('_');
}
exports.generateEntryKey = generateEntryKey;
function generateKey(text) {
    const noCharText = text.replace(/[\u0021-\u007E\u00A1-\u00FF\u3001-\u301f\uff01-\uff0f\uff1a-\uff20\uff3b-\uff40\uff5b-\uff65\n]/g, '');
    const pinYinRaw = (0, pinyin_pro_1.pinyin)(noCharText, {
        toneType: 'none',
    });
    const pinYinStr = generateEntryKey(pinYinRaw);
    return pinYinStr.length > 40 ? '' : pinYinStr;
}
const factory = ts.factory;
/**
 * 获取一个中文提取/替换的转换器
 * @param matches 匹配到的中文词条
 * @param fileName 文件名
 * @param code 文件字符串
 * @returns
 */
function getChineseTransformer(matches, fileName, code) {
    const entries = global['local_entries'];
    const { templateString } = global['intlConfig'];
    const chineseTransformer = (context) => (rootNode) => {
        function visit(node) {
            switch (node.kind) {
                case ts.SyntaxKind.StringLiteral: {
                    const { text } = node;
                    if (text.match(constant_1.DOUBLE_BYTE_REGEX)) {
                        const textKey = generateKey(text);
                        // 1. 在本地寻找词条，如果找到
                        const findEntry = entries.find(entry => entry.key === textKey);
                        const langs = findEntry?.langs || {};
                        const key = findEntry?.key || textKey;
                        const isMatch = !!findEntry;
                        matches.push({
                            isMatch,
                            key,
                            value: text,
                            comment: `
            /**
             * ${text}
             */`,
                            ...langs,
                        });
                        if (isMatch) {
                            const parentNodeKind = node.parent.kind;
                            const result = parentNodeKind === ts.SyntaxKind.JsxAttribute
                                ? `{I18N.index.${key}}`
                                : `I18N.index.${key}`;
                            return factory.createIdentifier(result);
                        }
                    }
                    break;
                }
                case ts.SyntaxKind.JsxText: {
                    const text = node.getText();
                    let noCommentText = (0, common_1.removeFileComment)(text, fileName);
                    if (noCommentText.match(constant_1.DOUBLE_BYTE_REGEX)) {
                        noCommentText.replace(';\n', '');
                        const textKey = generateKey(noCommentText);
                        const findEntry = entries.find(entry => entry.key === textKey);
                        const langs = findEntry?.langs || {};
                        const key = findEntry?.key || textKey;
                        const isMatch = !!findEntry;
                        matches.push({
                            isMatch,
                            key,
                            value: noCommentText,
                            comment: `
            /**
             * ${noCommentText}
             */`,
                            ...langs,
                        });
                        if (isMatch) {
                            return factory.createJsxText(`{I18N.index.${key}}`);
                        }
                    }
                    break;
                }
                case ts.SyntaxKind.TemplateExpression: {
                    const { pos, end } = node;
                    let text = code.slice(pos, end);
                    if (text.match(constant_1.DOUBLE_BYTE_REGEX)) {
                        text.replace(/\$(?=\{)/g, '');
                        const textKey = generateKey(text);
                        if (templateString && templateString.funcName) {
                            const findEntry = entries.find(entry => entry.key === textKey);
                            const langs = findEntry?.langs || {};
                            const key = findEntry?.key || textKey;
                            const isMatch = !!findEntry;
                            matches.push({
                                isMatch,
                                key,
                                value: text,
                                comment: `
            /**
             * ${text}
             */`,
                                ...langs,
                            });
                            if (isMatch) {
                                // 返回新的节点(函数调用)
                                const variableList = (0, common_1.getVariableFromTemplateString)(text);
                                const objParam = factory.createObjectLiteralExpression(variableList.map(variable => factory.createPropertyAssignment(variable, factory.createIdentifier(variable))));
                                return factory.createCallExpression(factory.createIdentifier(templateString.funcName), undefined, [factory.createIdentifier(`I18N.index.${key}`), objParam]);
                            }
                        }
                        else {
                            console.warn(`模板字符串：${fileName} ${text} 无法处理`);
                        }
                    }
                    break;
                }
            }
            return ts.visitEachChild(node, visit, context);
        }
        return ts.visitNode(rootNode, visit);
    };
    return chineseTransformer;
}
exports.default = getChineseTransformer;
//# sourceMappingURL=chinese.js.map