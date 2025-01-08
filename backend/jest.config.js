/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ["**/**/*.test.js"],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
};