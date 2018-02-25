const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
loaders = require("./Loaders")
filesToCopy = require("./Copy")
const webpack = require('webpack');

module.exports = {
  entry: {
    // vendor: ['./src/vendor'],
    app: './src/index'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  module: {
    rules: loaders
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '..') }),
    new webpack.NormalModuleReplacementPlugin(
      /environments\/environment\.ts/,
      'environment.prod.ts'
    ),
    new CommonsChunkPlugin({
      // The order of this array matters
      names: ['vendor'],
      minChunks: Infinity
    }),
    new MinifyPlugin(),
    // not able to uglify, probably related to: https://github.com/Polymer/polymer-cli/issues/388
    //  new webpack.optimize.UglifyJsPlugin({
    //    compress: {
    //      warnings: false
    //    },
    //    sourceMap: false
    //  }),
    // new HtmlWebpackPlugin({
    //   template: './index.html'
    // }),
    // copy custom static assets
    new CopyWebpackPlugin(filesToCopy),
    // get around with stupid warning
    new webpack.IgnorePlugin(/vertx/),
  ]
};