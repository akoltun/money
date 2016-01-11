'use strict';

const gulp = require('gulp');
const gutil = require("gulp-util");
const config = require('config');
const runSequence = require('run-sequence');
const tasks = require('./tasks');
let mongoose = require('./server/lib/mongoose');

//NODEMON
gulp.task('nodemon', tasks.nodemon);

//WEBPACK
gulp.task('webpack:build', tasks.webpack.build);
gulp.task('webpack:build-dev', tasks.webpack.buildDev);
gulp.task("webpack-dev-server", tasks.webpack.devServer);

//LIVERELOAD
gulp.task("client:livereload", tasks.livereload);

//BUILD
gulp.task('build', ['webpack:build']);
gulp.task('build-dev', ['webpack:build-dev']);

//TEST
gulp.task('mocha', tasks.mocha);

//DB
gulp.task('db:load', tasks.dbLoad);

//DEV
//gulp.task('dev', ['nodemon', 'build', 'client:livereload']);
gulp.task('dev', ['nodemon']);






gulp.on('stop', function() {
  setTimeout(() => {
    mongoose.disconnect();
  }, 100);
});

gulp.on('err', function(gulpErr) {
  if (gulpErr.err) {
    console.error("Gulp error details", [gulpErr.err.message, gulpErr.err.stack, gulpErr.err.errors].filter(Boolean));
  }
  mongoose.disconnect();
});

process.on('uncaughtException', function(err) {
  console.error(err.message, err.stack, err.errors);
  process.exit(255);
});






