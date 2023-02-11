const eslint = require('eslint-define-config');

module.exports = eslint.defineConfig({
  root: true,
  extends: ['next/core-web-vitals', 'airbnb-typescript'],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    mocha: true,
    es6: true
  },
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/comma-dangle': 'off'
  },
  ignorePatterns: [
    '.eslintrc.js',
    'next.config.js',
    'vitest.config.ts'
  ]
});
