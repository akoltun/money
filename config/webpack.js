'use strict';

const webpack = require('webpack');
const server = require('webpack-dev-server');
const config = require('config');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_BSS = process.env.NODE_BSS || false;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const rimraf = require('rimraf');

function addHash(template, hash) {
  return isDev ?
    `${template}?hash=[${hash}]` :
    template.replace(/\.[^.]+$/, `.[${hash}]$&`);
}

module.exports = {

  context: config.client.root,

  entry: {
    main: './main.js',
    // accounts: './accounts.js',
    // categories: './categories.js',
    // dashboard: './dashboard.js'
  },

  output: {
    path: config.client.assets,
    publicPath: '/assets/',
    filename: addHash('[name].js', 'hash'),
    chunkFilename: addHash('[id].js', 'chunkhash'),
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

  watch: isDev,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: isDev ? 'cheap-inline-module-source-map' : null,

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
      loader: ExtractTextPlugin
        .extract('style', 'css!autoprefixer?browsers=last 2 versions!less')
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      exclude: /\/node_modules\//,
      loader: addHash('url?name=[path][name].[ext]&limit=4096', 'hash:6')
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
      LANG: JSON.stringify('en')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery' // for bootstrap
    }),
    new ExtractTextPlugin(addHash('[name].css', 'contenthash'), {
      allChunks: true,
      disable: isDev
    }),
    new AssetsPlugin({ // создать json с хэшами текущих версий файла
      filename: 'assets.json',
      path: config.client.assets
    })
  ],

  devServer: {
    host: config.server.host,
    port: 9000,
    // contentBase: config.server.public, // если html статика
    // hot: true,
    inline: true,
    proxy: [{
      path: /.*/,
      target: 'http://localhost:3000'
    }],
    stats: {
      colors: true
    }
  }

};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // jscs:disable
        drop_console: true, // jshint ignore:line
        unsafe: true
      }
    })
  );
}

if (NODE_BSS) {
  module.exports.plugins.push(
    new BrowserSyncPlugin({
      host: config.server.host,
      port: 9000,
      browser: ['google chrome'],
      open: false,
      online: false,
      notify: false,
      proxy: {
        target: `${config.server.host}:${config.server.port}`,
        ws: true
      }
    })
  );
}
