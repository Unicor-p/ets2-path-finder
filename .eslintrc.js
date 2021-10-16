module.exports = {
  env: {
    node: true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    '@typescript-eslint/no-explicit-any': [1, { fixToUnknown: true }],
    'prettier/prettier': 2
  }
};
