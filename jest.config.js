module.exports = {
  automock: false,
  rootDir: '..',
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: [
    '/node_modules/',
    '.history/',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  moduleNameMapper: {
    '^.*[.](css|CSS)$': '/src/__mocks__/styleMock.js',
  },

}
