'use strict';

const Router = require('koa-router');
let account = require('../controllers').account;
let mustBeAuthenticated = require('../lib/mustBeAuthenticated');

let router = new Router();

router
  .use('/', mustBeAuthenticated)
  .param('accountById', account.params.accountById)
  .get('/', account.getAccounts)
  .post('/', account.post)
  .get('/:accountById', account.getAccountTransactions)
  .patch('/:accountById', account.patch)
  .del('/:accountById', account.del);
  

module.exports = router.routes();
