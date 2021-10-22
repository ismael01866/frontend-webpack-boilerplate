module.exports = {
  root   : true,

  env    : {},
  extends: ['standard'],

  rules  : {
    semi                                : [2, 'always'],
    'key-spacing'                       : 0,
    'no-multi-spaces'                   : 0,
    'operator-linebreak'                : 0,
    'space-before-blocks'               : ['error', 'never'],
    'space-before-function-paren'       : ['error', 'never'],
    'standard/object-curly-even-spacing': 0
  },

  globals: {}
};
