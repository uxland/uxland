// const config = require('../../config/jest.config');
const pack = require('./package');

module.exports = {
  name: pack.name,
  displayName: pack.name,
  testEnvironment: 'node',
  testMatch: ['**/*.steps.js'],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverage: true,
  globals: {
    'babel-jest': {
      babelConfig: {
        comments: false,
        plugins: ['@babel/plugin-proposal-optional-chaining']
      }
    }
  }
};
