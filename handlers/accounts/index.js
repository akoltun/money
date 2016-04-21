'use strict';

const accountModel           = require('./accountModel');
const mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.Account = accountModel;

exports.init = function(app) {

  app.use(mountHandlerMiddleware('/accounts', __dirname));

};