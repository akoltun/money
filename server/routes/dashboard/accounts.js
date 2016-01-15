'use strict';

const Router = require('koa-router');
const account = require('../../controllers').api.account;
const accountCtrl = require('../../controllers').dashboard.account;
const transactionCtrl = require('../../controllers').dashboard.transaction;
const mustBeAuthenticated = require('../../lib/mustBeAuthenticated');

const router = new Router();

router
  .param('accountById', account.params.accountById)
  .use('/', mustBeAuthenticated, transactionCtrl.pre)
  .get('/', accountCtrl.getAccounts)
  .get('/:accountById', accountCtrl.getTransactionsByAccount);

module.exports = router.routes();