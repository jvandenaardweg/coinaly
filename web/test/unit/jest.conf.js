const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/web/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/web/test/e2e'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/web/test/unit/setup'],
  mapCoverage: true,
  coverageDirectory: '<rootDir>/web/test/unit/coverage',
  collectCoverageFrom: [
    'web/src/**/*.{js,vue}',
    '!web/src/main.js',
    '!web/src/router/index.js',
    '!**/node_modules/**'
  ],
  modulePathIgnorePatterns: [
    'npm-cache',
    '.npm'
  ]
}
