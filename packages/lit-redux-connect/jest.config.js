const config = require('../../config/jest.config');
const pack = require('./package');

module.exports = {
  ...config,
  name: pack.name,
  displayName: pack.name,
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: '@skatejs/ssr/jest'
};
