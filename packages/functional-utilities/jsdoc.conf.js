const baseConfig = require('../../config/jsdoc.conf');
module.exports = { ...baseConfig, opts: { ...baseConfig.opts, template: '../../node_modules/minami' } };
