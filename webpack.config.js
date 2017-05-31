const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// replace localhost with 0.0.0.0 if you want to access
// your app from wifi or a virtual machine
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const sourcePath = path.join(__dirname, './app');
const buildDirectory = path.join(__dirname, './build');

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

module.exports = function(env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const cssLoader = [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        module: true,
        localIdentName: '[path][name]-[local]',
      },
    },
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
        sourceMap: false,
        includePaths: [sourcePath],
      },
    },
  ];

  const plugins = [
    // create index.html
    new HtmlWebpackPlugin({
      template: './index.ejs',
      inject: true,
      production: isProd,
      minify: isProd && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ];

  if (isProd) {
    plugins.push(
      // minify remove some of the dead code
      new UglifyJSPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
      })
    );
  } else {
    plugins.push(
      // make hot reloading work
      new webpack.HotModuleReplacementPlugin(),
      // show module names instead of numbers in webpack stats
      new webpack.NamedModulesPlugin(),
      // don't spit out any errors in compiled assets
      new webpack.NoEmitOnErrorsPlugin()
    );
  }

  const entryPoint = isProd
    ? './index.js'
    : [
        // activate HMR for React
      'react-hot-loader/patch',

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
      `webpack-dev-server/client?http://${host}:${port}`,

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',

        // the entry point of our app
      './index.js',
    ];

  return {
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    context: sourcePath,
    entry: {
      main: entryPoint,
    },
    output: {
      path: buildDirectory,
      publicPath: '/',
      filename: '[name]-[hash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.(html|svg|jpe?g|png|ttf|woff2?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'static/[name]-[hash:8].[ext]',
            },
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: cssLoader,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 300000,
      maxEntrypointSize: 300000,
      hints: 'warning',
    },

    stats: stats,

    devServer: {
      contentBase: './app',
      publicPath: '/',
      historyApiFallback: true,
      port: port,
      host: host,
      hot: !isProd,
      compress: isProd,
      stats: stats,
    },
  };
};
