'use strict';

const transactionModel           = require('./transactionModel');
const mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.Transaction = transactionModel;

exports.init = function(app) {

  app.use(mountHandlerMiddleware('/transactions', __dirname));

};