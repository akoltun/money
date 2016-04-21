'use strict';

const userModel              = require('./userModel');
const mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.User = userModel;

exports.init = function(app) {

  app.use(mountHandlerMiddleware('/users', __dirname));

};