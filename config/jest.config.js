module.exports = {
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['./test/unit/setup.ts'],
  transformIgnorePatterns: [],
  transform: {
    '^.+\\\\node_modules\\\\.*?\\\\es\\\\.*?\\\\*?.ts$': 'ts-jest',
    '^.+\\node_modules\\.*?\\es\\.*?\\*?.ts$': 'ts-jest',
    '^.+/node_modules/.*?/es/.*?/*?.ts$': 'ts-jest',
    '^.+\\\\packages\\\\.*?\\\\src\\\\.*?\\\\*?.ts$': 'ts-jest',
    '^.+\\packages\\.*?\\src\\.*?\\*?.ts$': 'ts-jest',
    '^.+/packages/.*?/src/.*?/*?.ts$': 'ts-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+.ts$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/*.steps.ts'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverage: true,
  globals: {
    'ts-jest': {
      babelConfig: {
        comments: false,
        plugins: ['@babel/plugin-proposal-optional-chaining']
      }
    }
  }
};
