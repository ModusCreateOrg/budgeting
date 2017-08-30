const webpack = require('webpack');
const path = require('path');

const outputPath = path.resolve('dll');

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    libs: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-hot-loader',
      'react-router-dom',
      'redux-thunk',
      'reselect',
      'd3',
    ],
  },

  output: {
    filename: '[name].dll.js',
    path: outputPath,

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_dll',
  },

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: 'dll/[name]-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_dll',
    }),
  ],
};
