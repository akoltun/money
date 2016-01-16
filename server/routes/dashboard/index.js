'use strict';

const Router = require('koa-router');
const dashboard = require('../../controllers').dashboard.main;
const mustBeAuthenticated = require('../../lib/mustBeAuthenticated');
const transactionCtrl = require('../../controllers').dashboard.transaction;
const router = new Router();

const accounts = require('./accounts');
const categories = require('./categories');
const transactions = require('./transactions');

router
  .use('/', mustBeAuthenticated, dashboard.getStats)
  .get('/', dashboard.get)
  .use('/accounts', accounts)
  .use('/categories', categories)
  .use('/transactions', transactions);

module.exports = router.routes();