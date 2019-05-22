const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'hyperline.js',
    libraryTarget: 'commonjs',
  },
  plugins: [
    new webpack.DefinePlugin({
      'global.GENTLY': false,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  externals: [nodeExternals(), 'hyper/component', 'hyper/notify', 'hyper/decorate'],
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
