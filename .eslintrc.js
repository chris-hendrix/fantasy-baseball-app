module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: ['airbnb', 'standard', 'eslint:recommended', 'plugin:cypress/recommended'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  plugins: ['react', 'jest', 'cypress'],
  rules: {
    'max-len': 0,
    'no-plusplus': [
      'error',
      { allowForLoopAfterthoughts: true }
    ],
    'multiline-ternary': 0,
    'no-restricted-globals': 1,
    'import/no-cycle': 1,
    'jsx-a11y/anchor-is-valid': 1,
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/label-has-associated-control': 1,
    'prefer-destructuring': 1,
    'react/no-this-in-sfc': 1,
    'react/default-props-match-prop-types': 1,
    'react/require-default-props': 1,
    'react/sort-comp': 1,
    'react/no-access-state-in-setstate': 1,
    'react/no-unescaped-entities': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': 0,
    'default-case': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'comma-dangle': 0
  }
};