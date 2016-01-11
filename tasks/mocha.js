'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');

let mochaOpts = {
  reporter: 'spec',
  timeout: 2000,
  require: ['co-mocha', 'should']
};

module.exports = function() {
  return gulp.src(['./server/test/*.js'])
    .pipe(mocha(mochaOpts));
};