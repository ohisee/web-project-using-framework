const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'), // current directory output file will be saved to, must be fully absolute path
    filename: 'bundle.js',
    //publicPath: '/build',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ],
      },
      {
        //use: ['style-loader', 'css-loader'], // apply from right to left
        // loader: ExtractTextPlugin.extract({
        //   loader: 'css-loader'
        // }),
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 } //40000 bytes
          },
          'image-webpack-loader'
        ],
        exclude: path.join(__dirname, 'src/assets', 'webpack.png'),
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
        exclude: path.join(__dirname, 'src/assets', 'webpack.png'),
      },
      {
        test: /webpack\.png/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'img/',
              //publicPath: 'img/'
            }
          },
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css'
    }),
    new webpack.optimize.UglifyJsPlugin({}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new HtmlWebPackPlugin({
      filename: 'users.html',
      template: 'src/users.html',
      chunks: []
    }),
  ],
};

module.exports = config;
