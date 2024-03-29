"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usingTransformer = void 0;
const ts = require("typescript");
const common_1 = require("../utils/common");
const factory = ts.factory;
/**
 * 获取新的函数体（Block类型）
 * @param fn
 * @returns
 */
function getNewBlock(fn) {
    const originalFn = fn;
    const useStatement = factory.createVariableStatement(undefined, factory.createVariableDeclarationList([
        factory.createVariableDeclaration(factory.createObjectBindingPattern([
            factory.createBindingElement(undefined, undefined, factory.createIdentifier('I18N'), undefined),
        ]), undefined, undefined, factory.createCallExpression(factory.createIdentifier('useI18n'), undefined, [])),
    ], ts.NodeFlags.Const));
    if (ts.isBlock(fn.body)) {
        const originalBody = originalFn.body;
        const newStatements = [useStatement, ...originalBody.statements];
        return factory.updateBlock(originalBody, newStatements);
    }
}
/**
 * 是否是目标函数（判断是否是嵌套函数 是否返回了JSX）
 * @param fn
 * @returns
 */
function isTargetFn(fn) {
    return (!(0, common_1.isNestedFunction)(fn) &&
        (0, common_1.isFunctionHasJSX)(fn));
}
/**
 * 处理`useI18n`使用侧在函数内部声明的转换器
 * @param context
 * @returns
 */
const usingTransformer = (context) => (rootNode) => {
    function visit(node) {
        switch (node.kind) {
            // 处理箭头函数（表达式和代码块）
            case ts.SyntaxKind.ArrowFunction: {
                if (isTargetFn(node)) {
                    const originalFn = node;
                    const newBlock = getNewBlock(originalFn);
                    if (newBlock) {
                        return factory.updateArrowFunction(originalFn, originalFn.modifiers, originalFn.typeParameters, originalFn.parameters, originalFn.type, originalFn.equalsGreaterThanToken, newBlock);
                    }
                }
                break;
            }
            // 处理函数定义
            case ts.SyntaxKind.FunctionDeclaration: {
                if (isTargetFn(node)) {
                    const originalFn = node;
                    const newBlock = getNewBlock(originalFn);
                    if (newBlock) {
                        return factory.updateFunctionDeclaration(originalFn, originalFn.modifiers, originalFn.asteriskToken, originalFn.name, originalFn.typeParameters, originalFn.parameters, originalFn.type, newBlock);
                    }
                }
                break;
            }
            // 处理函数表达式
            case ts.SyntaxKind.FunctionExpression: {
                if (isTargetFn(node)) {
                    const originalFn = node;
                    const newBlock = getNewBlock(originalFn);
                    if (newBlock) {
                        return factory.updateFunctionDeclaration(originalFn, originalFn.modifiers, originalFn.asteriskToken, originalFn.name, originalFn.typeParameters, originalFn.parameters, originalFn.type, newBlock);
                    }
                }
                break;
            }
        }
        return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(rootNode, visit);
};
exports.usingTransformer = usingTransformer;
//# sourceMappingURL=using.js.map