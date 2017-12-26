// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 强制用封号结尾js
    'semi':['error','always'],
    // 忽略缩进格式
    'indent':0,
    // 忽略函数名和括号之间无需加空格
    'space-before-function-paren': 0,
    'space-in-parens': 0,
    "space-infix-ops": 0,
    "no-console": 0,
    "no-unused-vars": 0
  }
}
