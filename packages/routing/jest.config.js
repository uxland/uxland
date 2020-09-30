const config = require('../project-tools/test/jest.config');
const pack = require('./package');

module.exports = { ...config, name: pack.name, displayName: pack.name };
