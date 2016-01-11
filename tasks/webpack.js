'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const config = require('config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.js');

exports.build = function(callback) {
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    if (!webpackConfig.watch) callback();
  });
};

exports.buildDev = function(callback) {
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    if (!webpackConfig.watch) callback();
  });
};

exports.devServer = function(callback) {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    //contentBase: config.server.root,
    hot: true,
    proxy: [{
      path: /.*/,
      target: 'http://localhost:3000'
    }],
    stats: {
      colors: true
    }
  }).listen(9000, "127.0.0.1", function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:9000/");
  });
};
