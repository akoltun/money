'use strict';
const webpack = require('webpack');
const server = require('webpack-dev-server'); /*eslint no-unused-vars:0*/
const config = require('config');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const NODE_ENV = process.env.NODE_ENV || 'development';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  context: config.client.root,

  entry: {
    vendor: './vendor.js',
    main: './main.js'
  },

  output: {
    path: config.server.public,
    publicPath: '/',
    filename: '[name].js'
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  resolveLoaders: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  watch: isDev,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: isDev ? 'cheap-inline-module-source-map' : null,

  module: {
    loaders: [{
      test: /\.js?$/,
      include: config.client.root,
      loader: 'ng-annotate?add=true!babel?presets[]=es2015'
    }, {
      test: /\.tmpl.jade$/,
      loader: 'jade'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin
        .extract('style', 'css!autoprefixer?browsers=last 2 versions!less')
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      exclude: /\/node_modules\//,
      loader: 'url?name=[path][name].[ext]&limit=4096'
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      include: /\/node_modules\//,
      loader: 'file?name=[1]&regExp=node_modules/(.*)'
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'jade!./client/index.jade',
      inject: 'body'
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: JSON.stringify('en')
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
      disable: isDev
    })
  ],

  devServer: {
    host: config.server.host,
    port: 9000,
    contentBase: config.server.public, // если html статика
    // hot: true,
    inline: true,
    proxy: [{
      path: /api.*/,
      target: 'http://localhost:3000'
    }],
    stats: {
      colors: true
    }
  }

};

if (isProd) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true, /*eslint camelcase:0*/
        unsafe: true
      }
    })
  );
}
