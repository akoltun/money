'use strict';
let livereload = require('gulp-livereload');
let gulp = require('gulp');
let gutil = require('gulp-util');

module.exports = function(options) {
  livereload.listen();
  gutil.log('livereload: listen on change ../public/**/*.*');
  gulp.watch(['./public/**/**', './server/templates/**/**']).on('change', (changed) => {
    livereload.reload();
  });
};
