/* eslint-disable indent */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const sourceDir = path.join(__dirname, './app');
const dllManifest = require('./dll/libs-manifest.json');

const entryPath = path.join(sourceDir, './index.js');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;

module.exports = require('./webpack.config.base')({
  mode: 'development',

  entry: {
    front: [
      // activate HMR for React
      'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      `webpack-dev-server/client?http://${host}:${port}`,

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',

      // the entry point of our app
      entryPath,
    ],
  },

  // devtool: 'source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },

  plugins: [
    // import dll manifest
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '.'),
      manifest: dllManifest,
    }),

    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['front'],
      filename: 'index.html',
      template: 'index.dev.ejs',
    }),

    // make DLL assets available for the app to download
    new AddAssetHtmlPlugin([{ filepath: require.resolve('./dll/libs.dll.js'), includeSourcemap: false }]),

    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        include: sourceDir,
        use: {
          loader: 'file-loader',
          query: {
            name: 'static/[name].[ext]',
          },
        },
      },
      {
        test: /\.scss$/,
        include: [sourceDir],
        use: [
          'cache-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]',
              importLoaders: 1,
              context: sourceDir,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: false,
              includePaths: [sourceDir, path.resolve(sourceDir, './app')],
            },
          },
        ],
      },
      {
        test: /\.(jsx?)$/,
        include: sourceDir,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.join(__dirname, '.babel-cache', 'dev'),
            },
          },
        ],
      },
    ],
  },
});
