const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // create index.html file based off template in src
const CleanWebpackPlugin = require('clean-webpack-plugin'); // deletes old dist folder for clean build

module.exports = {
  entry: { main: './client/src/index.js' },
  output: {
    path: join(__dirname, '../../client/dist'),
    publicPath: '',
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: './client/src/index.html',
      filename: 'index.html',
    }),
  ],
};
