module.exports = {
  '*.ts': [
    'eslint -c node_modules/@uxland/project-tools/lint/.eslintrc.js',
    'prettier --config node_modules/@uxland/project-tools/lint/.prettierrc.js --ignore-path ./.prettierignore --write',
  ],
};
