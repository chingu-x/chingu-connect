const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // compress/minify js
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // create separate css file for production
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.[hash].css',
      disable: false,
      allChunks: true,
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
  devtool: 'source-map',
});
