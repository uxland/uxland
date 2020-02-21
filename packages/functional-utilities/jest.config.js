const config = require('../../config/test/jest.config');
const pack = require('./package');

module.exports = {
  ...config,
  name: pack.name,
  displayName: pack.name,
  setupFilesAfterEnv: ['../../config/test/setup.ts']
};
