const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
    {
        files: ['src/**/*.ts', '__tests__/**/*.ts', 'example/**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...(prettierConfig.rules || {}),
            'prettier/prettier': [
                'error',
                {
                    arrowParens: 'avoid',
                    endOfLine: 'auto',
                    printWidth: 120,
                    singleQuote: true,
                },
            ],
        },
    },
];
