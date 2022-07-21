module.exports = {
  env: {
    // browser: true,
    commonjs: true,
    es2022: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['warn', 'never'],
    'linebreak-style': ['error', 'windows'],
    'no-undef': 'off',
    quotes: ['warn', 'single'],
    'no-unused-vars': ['error', { args: 'none' }]
  }
}
