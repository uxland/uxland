module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./config/tsconfig.eslint.json']
  },
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'warn'
  }
};
