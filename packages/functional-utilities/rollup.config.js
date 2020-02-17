const buildConfig = require('../../config/rollup.config');
const pkg = require('./package.json');
const config = buildConfig(pkg);
module.exports = config;
