const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// replace localhost with 0.0.0.0 if you want to access
// your app from wifi or a virtual machine
const host = (process.env.HOST || 'localhost');
const port = (process.env.PORT || 3000);
const sourcePath = path.join(__dirname, './client');
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
  }
};

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const plugins = [
    // extract vendor packages in a separate chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),

    // setting production environment will strip out
    // some of the development code from the app
    // and libraries
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),

    // create css bundle
    new ExtractTextPlugin('style.css'),

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
      new webpack.optimize.UglifyJsPlugin({
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
        output: {
          comments: false,
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

  const entryPoint = isProd ? './index.js' : [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    `webpack-dev-server/client?http://${host}:${port}`,

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // the entry point of our app
    './index.js'
  ];

  return {
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    context: sourcePath,
    entry: {
      main: entryPoint,
      vendor: [
        'react',
        'react-dom',
        'redux',
        'redux-thunk',
        'react-redux',
        'hoist-non-react-statics',
      ],
    },
    output: {
      path: buildDirectory,
      publicPath: '/',
      filename: '[name]-[hash:8].js',
      chunkFilename: 'chunk[name]-[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.(html|svg)$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            query: {
              name: 'static/[name]-[hash:8].[ext]'
            },
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  module: true,
                  localIdentName: isProd ? '[hash:base64:5]' : '[path][name]-[local]'
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: isProd ? 'collapsed' : 'expanded',
                  sourceMap: isProd,
                  includePaths: [sourcePath],
                },
              },
            ],
          })
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        sourcePath
      ]
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 300000,
      maxEntrypointSize: 300000,
      hints: 'warning',
    },

    stats: stats,

    devServer: {
      contentBase: './client',
      publicPath: '/',
      historyApiFallback: true,
      port: port,
      host: host,
      hot: !isProd,
      compress: isProd,
      stats: stats,
    }
  };
};
