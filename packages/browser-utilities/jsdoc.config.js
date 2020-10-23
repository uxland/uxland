const baseConfig = require('../project-tools/documentation/jsdoc.config');
module.exports = { ...baseConfig, opts: { ...baseConfig.opts, template: '../../node_modules/docdash' } };
