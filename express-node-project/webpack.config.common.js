const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'app': './assets/app/main.ts',
    'vendor': './assets/app/vendor.ts',
    'polyfills': './assets/app/polyfills.ts'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: path.resolve('./assets/app'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap']
        })
      },
      {
        test: /\.css$/,
        // loaders: ['to-string-loader'].concat(ExtractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: ['css-loader?sourceMap']
        // }))
        include: path.resolve('./assets/app'),
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'url-loader?limit=100000'
      }
    ],
    exprContextCritical: false
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css'
      //filename: '[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'polyfills']
    })
  ]
};