import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', '*.js.map']
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        browser: true,
        jest: true,
        node: true,
        es6: true,
        console: 'readonly',
        window: 'readonly',
        document: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      prettier: prettierPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': 'error',
      'no-confusing-arrow': 'off',
      'strict': 'off',
      'implicit-arrow-linebreak': 'off',
      'import/prefer-default-export': 'off',
      'no-debugger': 'off',
      'multiple-empty-lines': 'off',
      'eol-last': 'off',
      'no-spaced-func': 'off',
      'func-call-spacing': 'off',
      'no-multiple-empty-lines': 'off',
      'no-unneeded-ternary': 'off',
      'no-case-declarations': 'off',
      'arrow-parens': 'off',
      'no-useless-escape': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          args: 'none',
          ignoreRestSiblings: true
        }
      ],
      'no-redeclare': [
        'error',
        {
          builtinGlobals: false
        }
      ],
      'no-plusplus': 'off',
      'no-nested-ternary': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'lines-between-class-members': 'off',
      'default-param-last': 'off',
      'no-undef': 'off',
      'radix': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          jsx: 'never',
          ts: 'never',
          tsx: 'never'
        }
      ]
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  }
];