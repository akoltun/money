'use strict';

const Router = require('koa-router');
const transactionCtrl = require('../../controllers').dashboard.transaction;
const mustBeAuthenticated = require('../../lib/mustBeAuthenticated');

const router = new Router();

router
  .use('/', mustBeAuthenticated, transactionCtrl.pre)
  .get('/', transactionCtrl.getTransactions);

module.exports = router.routes();