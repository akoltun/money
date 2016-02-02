'use strict';

const Router = require('koa-router');
const accountAPICtrl = require('../../controllers').api.account;
const accountCtrl = require('../../controllers').dashboard.account;

const router = new Router();

router
  .param('accountById', accountAPICtrl.params.accountById)
  .get('/', accountCtrl.getAccounts)
  .get('/:accountById', accountCtrl.getTransactionsByAccount)
  .get('/editaccount/:accountById', accountCtrl.editAccountById);

module.exports = router.routes();