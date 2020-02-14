// const config = require('../../config/jest.config');
const pack = require('./package');
// const customTransform = {
//   '^.+\\.jsx?$': 'babel-jest'
// };
// const transform = { ...config.transform, ...customTransform };
// module.exports = { ...config, name: pack.name, displayName: pack.name };

module.exports = {
  name: pack.name,
  displayName: pack.name,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/unit/setup.js'],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverage: true
};
