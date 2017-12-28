module.exports = {
  setupFiles: ['<rootDir>/jest/requestAnimationFrame.js', '<rootDir>/jest/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    // Use proxy to mock CSS Modules. Lookups on the styles object will be returned as-is
    // (e.g., styles.foobar === 'foobar')
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',

    // Transform file imports into file names
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/fileTransformer.js',
  },
};
