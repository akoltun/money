'use strict';

let co = require('co');
let gutil = require('gulp-util');
let config = require('config');

let loadModels = require('../server/lib/db/loadModels');

module.exports = function() {

  return co(function*() {
    gutil.log("loading db");
    yield* loadModels(config.server.fixtures);
    gutil.log("db loaded");
  });

};
