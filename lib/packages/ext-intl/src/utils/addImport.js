"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImportToFile = void 0;
const ts = require("typescript");
const constant_1 = require("../constant");
const factory = ts.factory;
/**
 * 向文件中添加import语句
 * @param ast 目标文件的sourceFile
 * @param code 目标文件的字符串
 * @returns 修改后的sourceFile
 */
function addImportToFile(ast, code) {
    if (code.includes(constant_1.IMPORT_STATEMENT)) {
        return ast;
    }
    const importStatement = factory.createImportDeclaration(undefined, ts.factory.createImportClause(false, undefined, ts.factory.createNamedImports([
        ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier('useI18n')),
    ])), ts.factory.createStringLiteral('@/i18n/context'));
    const updatedStatements = [importStatement, ...ast.statements];
    return factory.updateSourceFile(ast, updatedStatements);
}
exports.addImportToFile = addImportToFile;
//# sourceMappingURL=addImport.js.map