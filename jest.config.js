module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/*|(\\.|/)test)\\.ts$',
  testPathIgnorePatterns: ['node_modules', 'lib'],
  moduleFileExtensions: ['ts', 'js'],
};
