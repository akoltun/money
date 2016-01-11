'use strict';

const nodemon = require('gulp-nodemon');

const nodemonOptions = {
  "restartable": "rs",
  script: './server/',
  ext: 'js',
  env: {
    "NODE_ENV": "development",
    "NODE_TRACE": true
  },
  "ignore": [".git", "node_modules", "bower_components", ".sass-cache", "frontend", "public", "client"],
};

module.exports = function() {
  nodemon(nodemonOptions);
};