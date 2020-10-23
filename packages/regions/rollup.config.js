const buildConfig = require('../project-tools/build/rollup.config');
const pkg = require('./package.json');
const config = buildConfig(pkg);
module.exports = config;
