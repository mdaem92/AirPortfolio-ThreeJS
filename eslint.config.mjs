import js from '@eslint/js'
import globals from 'globals'
import hooks from 'eslint-plugin-react-hooks'

export default [
    { ignores: ['build/**', 'node_modules/**'] },
    {
        files: ['src/**/*.{js,jsx}'],
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest', sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: globals.browser,
        },
        plugins: { 'react-hooks': hooks },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
        },
    },
    {
        files: ['src/**/*.test.{js,jsx}'],
        languageOptions: { globals: { ...globals.vitest } },
    },
]
