'use strict';

const Router = require('koa-router');
let accountCtrl = require('../../controllers').api.account;
let mustBeAuthenticated = require('../../lib/mustBeAuthenticated');

let router = new Router();

router
  .param('accountById', accountCtrl.params.accountById)
  .get('/', accountCtrl.getAccounts)
  .post('/', accountCtrl.post)
  .get('/:accountById', accountCtrl.getAccountTransactions)
  .patch('/:accountById', accountCtrl.patch)
  .del('/:accountById', accountCtrl.del);
  

module.exports = router.routes();
