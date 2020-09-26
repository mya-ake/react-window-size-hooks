const env = process.env.TEST_ENV === 'node' ? 'node' : 'jsdom';

module.exports = {
  preset: 'ts-jest',
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^~fixtures/(.*)$': '<rootDir>/tests/fixtures/$1',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/integration/**/*.spec.tsx'],
  testURL: 'http://localhost/',
  testEnvironment: env,
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tests/tsconfig.json',
    },
  },
};
