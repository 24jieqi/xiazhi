"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unicodeToChar = exports.isFunctionHasJSX = exports.isNestedFunction = exports.generateEntryKey = exports.removeDuplicatedTextList = exports.removeDuplicatedText = exports.mkRootDirIfNeeded = exports.handle = exports.timeEnd = exports.time = exports.log = exports.isAndEmpty = exports.getVersionName = exports.formatFileName = exports.getOutputPath = exports.isNative = exports.useTs = exports.resolvePath = exports.getVariableFromTemplateString = exports.getQuotePath = exports.removeFileComment = void 0;
/* eslint-disable no-console */
const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");
const utils_1 = require("@fruits-chain/utils");
const ts = require("typescript");
const constant_1 = require("../constant");
/**
 * 去掉文件中的注释
 * @param code
 * @param fileName
 */
function removeFileComment(code, fileName) {
    const printer = ts.createPrinter({ removeComments: true });
    const sourceFile = ts.createSourceFile('', code, ts.ScriptTarget.ES2015, true, fileName.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    return printer.printFile(sourceFile);
}
exports.removeFileComment = removeFileComment;
/**
 * 按分割符'/'返回解析后的路径列表
 * @param fileRelativePath
 * @returns
 */
function parsePath(fileRelativePath) {
    const { dir, name } = path.parse(fileRelativePath);
    const paths = [];
    const spliter = /[\/\\\\]/;
    paths.push(...dir.split(spliter).filter(Boolean));
    paths.push(name);
    return paths;
}
/**
 * 获取应用路径字符
 * @param rootPath
 * @param filePath
 * @param versionName
 * @returns
 */
function getQuotePath(rootPath, filePath, versionName) {
    const relativePath = filePath.replace(rootPath, '');
    const paths = parsePath(relativePath).map(item => formatFileName(item)); // 把短横线换成下划线
    return `I18N.${versionName}.${paths.join('.')}`;
}
exports.getQuotePath = getQuotePath;
/**
 * 获取模板字符串中的变量名
 * @param text 模板字符串
 */
function getVariableFromTemplateString(text) {
    if (!text) {
        return [];
    }
    const reg = /\$\{(.+?)\}/g;
    const variableList = [];
    while (true) {
        const result = reg.exec(text);
        if (!result)
            break;
        variableList.push(result[1]);
    }
    return variableList;
}
exports.getVariableFromTemplateString = getVariableFromTemplateString;
/**
 * 基于当前目录生成绝对路径
 * @param pathName
 */
function resolvePath(pathName) {
    return path.resolve(process.cwd(), pathName);
}
exports.resolvePath = resolvePath;
/**
 * 检测是否是ts环境
 */
function useTs() {
    return fs.existsSync(resolvePath('tsconfig.json'));
}
exports.useTs = useTs;
/**
 * 简易判断是否是RN
 * @returns
 */
function isNative() {
    return fs.existsSync(resolvePath('metro.config.js'));
}
exports.isNative = isNative;
/**
 * 获取输出路径(兼容vscode插件)
 */
function getOutputPath() {
    return resolvePath('./src/i18n');
}
exports.getOutputPath = getOutputPath;
/**
 * 格式化文件名称
 * @param fnameStr
 * @returns
 */
function formatFileName(fnameStr) {
    const fileNameArr = fnameStr.split('-');
    return fileNameArr
        .map((name, index) => {
        if (index === 0) {
            return name;
        }
        return name.substring(0, 1).toUpperCase() + name.substring(1);
    })
        .join('');
}
exports.formatFileName = formatFileName;
/**
 * 获取当次版本号
 * @returns
 */
function getVersionName() {
    const outputPath = getOutputPath();
    const basePath = `${outputPath}/langs`;
    // 首次生成
    if (!fs.existsSync(basePath)) {
        return `v${constant_1.INIT_VERSION_NUMBER}`;
    }
    // 获取新的版本号
    const childPathList = fs.readdirSync(basePath);
    const versionExist = [];
    for (const childPath of childPathList) {
        const childPathAbsolute = `${basePath}/${childPath}`;
        if (fs.statSync(childPathAbsolute).isDirectory()) {
            const relativePath = path.relative(basePath, childPathAbsolute);
            if (relativePath.startsWith('v')) {
                versionExist.push(Number(relativePath.replace('v', '')));
            }
        }
    }
    const versionSorted = versionExist.filter(Boolean).sort((a, b) => a - b);
    const lastVerion = versionSorted.pop();
    return `v${lastVerion + 1 || constant_1.INIT_VERSION_NUMBER}`;
}
exports.getVersionName = getVersionName;
function isAndEmpty(value, type, validator) {
    return (0, utils_1.isType)(type)(value) && validator(value);
}
exports.isAndEmpty = isAndEmpty;
exports.log = console.log;
exports.time = console.time;
exports.timeEnd = console.timeEnd;
/**
 * 异步处理函数
 * @param promise
 * @returns
 */
async function handle(promise) {
    try {
        const data = await promise;
        return [data, undefined];
    }
    catch (err) {
        return [undefined, err];
    }
}
exports.handle = handle;
/**
 * 多语言根目录创建（如果已经存在则跳过）
 */
async function mkRootDirIfNeeded() {
    const rootDir = getOutputPath();
    try {
        await fsPromise.access(rootDir);
    }
    catch (error) {
        await fsPromise.mkdir(rootDir, { recursive: true });
    }
}
exports.mkRootDirIfNeeded = mkRootDirIfNeeded;
/**
 * 匹配到词条去除重复
 * @param textSet 当前已去重词条列表
 * @param list 需要去重的词条数据
 * @returns 自身去重和已去重列表去重后的结果
 */
function removeDuplicatedText(textSet, list) {
    const result = [];
    for (const item of list) {
        if (!textSet.find(one => one.value === item.value) &&
            !result.find(i => i.value === item.value)) {
            result.push(item);
        }
    }
    return result;
}
exports.removeDuplicatedText = removeDuplicatedText;
/**
 * 单个列表的词条数据去重复
 * @param list
 */
function removeDuplicatedTextList(list) {
    const result = [];
    for (const item of list) {
        if (!result.find(one => one.value === item.value)) {
            result.push(item);
        }
    }
    return result;
}
exports.removeDuplicatedTextList = removeDuplicatedTextList;
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
/**
 * 是否是嵌套函数
 * @param node
 * @returns
 */
function isNestedFunction(node) {
    let current = node;
    while (current.parent) {
        current = current.parent;
        if (ts.isFunctionDeclaration(current) || ts.isArrowFunction(current)) {
            return true;
        }
    }
    return false;
}
exports.isNestedFunction = isNestedFunction;
/**
 * return 语句中是否有JSX节点
 * @param node
 * @returns
 */
function isReturnStatementHasJSX(node) {
    if (node) {
        if (node.kind === ts.SyntaxKind.JsxElement) {
            return true;
        }
        return ts.forEachChild(node, isReturnStatementHasJSX);
    }
}
/**
 * 是否是一个函数定义，并且包含JSX返回值
 * @param node
 * @returns
 */
function isFunctionHasJSX(node) {
    const { body, parent } = node;
    let res = false;
    if (!body) {
        return res;
    }
    body.forEachChild(child => {
        if (child.kind === ts.SyntaxKind.ReturnStatement) {
            const jsx = isReturnStatementHasJSX(child);
            if (jsx && parent.kind !== ts.SyntaxKind.CallExpression) {
                res = true;
                return;
            }
        }
    });
    return res;
}
exports.isFunctionHasJSX = isFunctionHasJSX;
function unicodeToChar(str) {
    return str.replace(/\\u[\dA-F]{4}/gi, function (match) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
}
exports.unicodeToChar = unicodeToChar;
//# sourceMappingURL=common.js.map