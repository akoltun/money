'use strict';

const config = require('config');
const gulp = require('gulp');
const del = require('del');

module.exports = function() {
  return del(config.server.public);
};