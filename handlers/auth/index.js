'use strict';

const mustBeAuthenticated    = require('./lib/mustBeAuthenticated');
const mountHandlerMiddleware = require('lib/mountHandlerMiddleware');
const authStrategy          = require('./lib/authStrategy');

exports.mustBeAuthenticated = mustBeAuthenticated;
exports.authStrategy = authStrategy;

exports.init = function(app) {

  app.use(mountHandlerMiddleware('/auth', __dirname));

};