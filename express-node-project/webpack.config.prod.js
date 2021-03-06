var path = require('path');

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge.smart(commonConfig, {

  entry: {
    'app': './assets/app/main.aot.ts'
  },

  output: {
    path: path.resolve(__dirname + '/public/js/app'),
    //filename: 'bundle.js',
    filename: '[name].js',
    publicPath: '/js/app/',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular-router-loader?aot=true'
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    })
  ]

});