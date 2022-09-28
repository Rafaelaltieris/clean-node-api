module.exports = {
  roots: ['<rootDir>/src'],
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']

}
