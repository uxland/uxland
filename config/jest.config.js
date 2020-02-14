module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/unit/setup.js'],
  transformIgnorePatterns: [],
  transform: {
    '^.+\\\\node_modules\\\\.*?\\\\es\\\\.*?\\\\*?.js$': 'babel-jest',
    '^.+\\node_modules\\.*?\\es\\.*?\\*?.js$': 'babel-jest',
    '^.+/node_modules/.*?/es/.*?/*?.js$': 'babel-jest',
    '^.+\\\\packages\\\\.*?\\\\src\\\\.*?\\\\*?.js$': 'babel-jest',
    '^.+\\packages\\.*?\\src\\.*?\\*?.js$': 'babel-jest',
    '^.+/packages/.*?/src/.*?/*?.js$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+.js$': 'babel-jest'
  },
  testPathIgnorePatterns: ['/node_modules/'],
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
