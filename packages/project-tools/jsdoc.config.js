const baseConfig = require('../../config/jsdoc.config');
module.exports = { ...baseConfig, opts: { ...baseConfig.opts, template: '../../node_modules/docdash' } };
