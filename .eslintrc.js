/* eslint-env node */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-undef': 'error',
  },
  parserOptions: {
    ecmaVersion: latest,
    sourceType: 'module',
    ecmaFeatures: {
    jsx: true
    }
    },
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  globals: {
    test: true,
    expect: true,
    document: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
