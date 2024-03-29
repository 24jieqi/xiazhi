"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['@fruits-chain/eslint-config-preset'],
    globals: {},
    rules: {
        // 自定义你的规则
        '@typescript-eslint/consistent-type-definitions': 0,
        '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
        'max-nested-callbacks': 'off',
        'no-console': [1, { allow: ['warn', 'error'] }],
        'no-unreachable-loop': [1, { ignore: ['ForOfStatement'] }],
    },
    parserOptions: {
        project: ['./tsconfig.json', './tsconfig.base.json'], // Specify it only for TypeScript files
    },
};
//# sourceMappingURL=.eslintrc.cjs.map