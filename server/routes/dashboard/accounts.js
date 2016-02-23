'use strict';

const Router = require('koa-router');
const accountAPICtrl = require('../../controllers').api.account;
const accountCtrl = require('../../controllers').dashboard.account;

const router = new Router();

router
  .param('id', accountAPICtrl.params.accountById)
  .get('/', accountCtrl.getAccounts)
  .get('/:id', accountCtrl.getTransactionsByAccount)
  .get('/addaccount', accountCtrl.addAccount)
  .post('/addaccount', accountCtrl.addAccountPost)
  .get('/editaccount/:id', accountCtrl.editAccountById)
  .post('/editaccount/:id', accountCtrl.editAccountByIdPost)
  .get('/deleteaccount/:id', accountCtrl.deleteAccountById);

module.exports = router.routes();