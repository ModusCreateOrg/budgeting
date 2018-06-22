/* eslint-disable indent */
const path = require('path');
const webpack = require('webpack');

const sourceDir = path.join(__dirname, './app');
const buildDir = path.join(__dirname, './build');

// replace localhost with 0.0.0.0 if you want to access
// your app from wifi or a virtual machine
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;
const protocol = process.env.PROTOCOL || 'http';

const servePath = process.env.SERVE_PATH || `${protocol}://${host}:${port}/`;

const { NODE_ENV = 'production' } = process.env;

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m',
  },
};

process.noDeprecation = true;

module.exports = config => ({
  mode: config.mode,
  optimization: config.optimization,
  entry: config.entry,
  module: config.module,

  context: sourceDir,

  output: Object.assign(
    {
      path: buildDir,
      publicPath: servePath,
    },
    config.output
  ),

  plugins: [
    // setting production environment will strip out
    // some of the development code from the app
    // and libraries
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
  ]
    // join with prod/dev plugins
    .concat(config.plugins)
    // removed null plugins
    .filter(Boolean),

  resolve: {
    modules: [path.resolve(__dirname, './node_modules'), sourceDir],
    symlinks: false,
  },

  stats,

  devServer: {
    contentBase: sourceDir,
    publicPath: '/',
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watchOptions: {
      ignored: ['node_modules', '*.svg'],
    },
    // hot: true,
    // inline: true,
    compress: false,
    disableHostCheck: true,
    stats,
    port,
    host,
  },
});
