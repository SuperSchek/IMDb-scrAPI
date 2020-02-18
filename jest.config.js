module.exports = {
  verbose: true,
  moduleFileExtensions: ["js", "json"],
  globals: {
    NODE_ENV: "test"
  },
  testPathIgnorePatterns: [".eslintrc.js", ".git"],
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  collectCoverageFrom: ["src/**/*.js", "bin/**/*.js"],
  /**
   * Automatically clear mock calls and instances before every test.
   * @docs https://jestjs.io/docs/en/configuration.html#clearmocks-boolean
   */
  clearMocks: true
};
