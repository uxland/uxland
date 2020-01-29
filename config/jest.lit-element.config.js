const common = require('./jest.config');
const customTransform = {
  '^.+\\\\node_modules\\\\lit-element\\\\.*?\\\\*?.js$': 'ts-jest',
  '^.+\\node_modules\\lit-element\\.*?\\*?.js$': 'ts-jest',
  '^.+/node_modules/lit-element/.*?/*?.js$': 'ts-jest',
  '^.+\\\\node_modules\\\\lit-html\\\\.*?\\\\*?.js$': 'ts-jest',
  '^.+\\node_modules\\lit-html\\.*?\\*?.js$': 'ts-jest',
  '^.+/node_modules/lit-html/.*?/*?.js$': 'ts-jest'
};
const transform = { ...common.transform, ...customTransform };
module.exports = { ...common, transform };
