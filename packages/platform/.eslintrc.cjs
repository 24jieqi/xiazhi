module.exports = {
  env: { browser: true, es2020: true },
  extends: ['@fruits-chain/eslint-config-preset'],
  globals: {},
  rules: {
    // 自定义你的规则
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
    'max-nested-callbacks': 'off',
    'no-console': [1, { allow: ['warn', 'error'] }],
    'react/no-unstable-nested-components': 0,
    'import/no-unresolved': 0,
  },
}
