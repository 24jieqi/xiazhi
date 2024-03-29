"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLangFile = void 0;
const ts = require("typescript");
/**
 * 更新文件
 */
function updateLangFile(ast, langType) {
    const entries = global['local_entries'];
    const transformer = (context) => (rootNode) => {
        function visit(node) {
            switch (node.kind) {
                case ts.SyntaxKind.PropertyAssignment: {
                    const current = node;
                    const key = current.name.getText();
                    const finded = entries.find(entry => entry.key === key);
                    if (finded && finded.langs[langType]) {
                        const valNode = ts.factory.createStringLiteral(finded.langs[langType], true);
                        return ts.factory.createPropertyAssignment(key, valNode);
                    }
                }
            }
            return ts.visitEachChild(node, visit, context);
        }
        return ts.visitNode(rootNode, visit);
    };
    const transformedFile = ts.transform(ast, [transformer]).transformed[0];
    const printer = ts.createPrinter();
    return printer.printFile(transformedFile);
}
exports.updateLangFile = updateLangFile;
//# sourceMappingURL=updateLangFile.js.map