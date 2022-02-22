module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 'no-console': 1,
    // 'no-debugger': 1,
    '@typescript-eslint/no-var-requires': 0,
    'linebreak-style': 0,
    'vue/multi-word-component-names': [0, {
      'ignores': []
    }],
    // 此规则旨在强制模板中每行具有多个属性
    'vue/max-attributes-per-line': [1, {
      'singleline': {
        'max': 10
      },      
      'multiline': {
        'max': 1
      }
    }],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
