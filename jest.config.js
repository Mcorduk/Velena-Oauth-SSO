/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: '@shelf/jest-mongodb',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
};
