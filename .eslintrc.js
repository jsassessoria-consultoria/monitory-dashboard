const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: ['next/core-web-vitals', 'airbnb-typescript'],
  overrides: [
    {
      parserOptions: {
        project: './tsconfig.json'
      },
      files: ['*.ts', '*.tsx']
    }
  ],
  rules: {
    'no-console': 'error',
    "@typescript-eslint/comma-dangle": "off",
  }
});
