module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    // coverage test plan management
    'app/containers/TestPlanManagementPage/index.js',
    'app/containers/TestPlanManagementPage/reducer.js',
    'app/containers/TestPlanManagementPage/actions.js',
    'app/containers/TestPlanManagementPage/selectors.js',
    'app/containers/TestPlanManagementPage/saga.js',
    'app/containers/TestPlanManagementPage/components/EditTestPlanDrawer/index.js',
    'app/containers/TestPlanManagementPage/components/EnvironmentDrawer/index.js',

    // converage user management
    'app/components/UserComponents/index.js',
    'app/containers/UserManagementPage/index.js',
    'app/containers/UserManagementPage/actions.js',
    'app/containers/UserManagementPage/reducer.js',
    'app/containers/UserManagementPage/selectors.js',
    'app/containers/UserManagementPage/saga.js',

    // converage test case management
    'app/containers/TestCaseManagementPage/index.js',
    'app/containers/TestCaseManagementPage/reducer.js',
    'app/containers/TestCaseManagementPage/selectors.js',
    'app/containers/TestCaseManagementPage/saga.js',
    'app/containers/TestCaseCreateUpdatePage/index.js',
    'app/containers/TestCaseCreateUpdatePage/reducer.js',
    'app/containers/TestCaseCreateUpdatePage/selectors.js',
    'app/containers/TestCaseCreateUpdatePage/saga.js',
  ],
  // The directory where Jest should output its coverage files
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
  coverageDirectory: 'coverage',
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFilesAfterEnv: ['<rootDir>/app/setupTest.js'],
  setupFiles: ['raf/polyfill'],

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.test.(js|jsx|ts|tsx)'],
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    '/node_modules/(?!(react|antd|store|rc-*))(.*)',
    '/tests',
    '/integration/',
  ],
  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost',
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    '/node_modules/(?!(css-animation|react|antd|store|rc-*)).+\\.js$',
  ],
  // Indicates whether each individual test should be reported during the run
  verbose: false,
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
    '.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
