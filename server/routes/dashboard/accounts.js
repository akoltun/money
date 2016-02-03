'use strict';

const Router = require('koa-router');
const accountAPICtrl = require('../../controllers').api.account;
const accountCtrl = require('../../controllers').dashboard.account;

const router = new Router();

router
  .param('accountById', accountAPICtrl.params.accountById)
  .get('/', accountCtrl.getAccounts)
  .get('/:accountById', accountCtrl.getTransactionsByAccount)
  .get('/addaccount', accountCtrl.addAccount)
  .post('/addaccount', accountCtrl.addAccountPost)
  .get('/editaccount/:accountById', accountCtrl.editAccountById)
  .post('/editaccount/:accountById', accountCtrl.editAccountByIdPost)
  .get('/deleteaccount/:accountById', accountCtrl.deleteAccountById);

module.exports = router.routes();