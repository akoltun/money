'use strict';

const webpack = require('webpack');
const server = require('webpack-dev-server');
const config = require('config');
const NODE_ENV = process.env.NODE_ENV || 'development';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const AssetsPlugin = require('assets-webpack-plugin');
const rimraf = require('rimraf');

function addHash(template, hash) {
  return NODE_ENV === 'production' ?
    template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`;
}

module.exports = {

  context: config.client.root,

  entry: {
    main: './main.js',
    login: './login.js',
    register: './register.js',
    accounts: './accounts.js',
    categories: './categories.js',
    // dashboard: './dashboard.js'
  },

  output: {
    path: config.client.assets,
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    library: '[name]'
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

  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : null,

  module: {
    loaders: [{
      test: /\.js?$/,
      include: config.client.root,
      loader: 'babel?presets[]=es2015'
    }, {
      test: /\.jade$/,
      loader: 'jade'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 versions!less')
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      exclude: /\/node_modules\//,
      loader: 'url?name=[path][name].[ext]&limit=4096',
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      include: /\/node_modules\//,
      loader: 'file?name=[1]&regExp=node_modules/(.*)',
    }]
  },

  plugins: [{
      apply: (compiler) => {
        rimraf.sync(compiler.options.output.path);
      }
    },
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: JSON.stringify('ru')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
      //disable: NODE_ENV === 'development'
    }),
    new AssetsPlugin({ // создать json с хэшами текущих версий файла
      filename: 'assets.json',
      path: config.client.assets
    })
  ],

  devServer: {
    host: config.server.host,
    port: 9000,
    //contentBase: config.server.root, // если html статика
    hot: true,
    proxy: [{
      path: /.*/,
      target: 'http://localhost:3000'
    }]
  }

};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}
