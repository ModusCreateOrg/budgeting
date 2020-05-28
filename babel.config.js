// eslint-ignore-next-line
module.exports = {
  presets: ['@modus/babel-preset-react', '@babel/preset-flow'],
  plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-object-rest-spread'],
  env: {
    development: {
      plugins: ['react-hot-loader/babel'],
    },
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs', 'dynamic-import-node'],
    },
  },
};
