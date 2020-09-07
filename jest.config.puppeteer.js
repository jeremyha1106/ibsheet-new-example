module.exports = {
  // eslint-disable-next-line global-require
  ...require('./jest.config'),
  // The glob patterns Jest uses to detect test files
  // directory of integration test will be update later
  testMatch: ['**/__tests__/integration/*.test.(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/(?!(react|antd|store|rc-*))(.*)'],
  preset: 'jest-puppeteer',
};
