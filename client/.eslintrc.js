module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': 'off',
    "global-require": 'off',
    "no-unused-vars": 'off',
    "class-methods-use-this": "off",
    "no-underscore-dangle": 'off',
    "camelcase": "off",
    "import/prefer-default-export": "off"
  },
};
