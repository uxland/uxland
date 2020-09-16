module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['../project-tools/test/setup.ts'],
  transformIgnorePatterns: [],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+.ts$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/test/benchmark/', '<rootDir>/test/sandbox/'],
  testMatch: ['**/*.steps.ts', '**/*.spec.ts'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverage: true,
  globals: {
    'ts-jest': {
      babelConfig: {
        comments: false,
        plugins: ['@babel/plugin-proposal-optional-chaining', ['@babel/plugin-proposal-decorators', { legacy: true }]],
      },
    },
  },
};
