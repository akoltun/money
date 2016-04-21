'use strict';

const categoryModel           = require('./categoryModel');
const mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.Category = categoryModel;

exports.init = function(app) {

  app.use(mountHandlerMiddleware('/categories', __dirname));

};