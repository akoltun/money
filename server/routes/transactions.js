'use strict';

const Router = require('koa-router');
let transaction = require('../controllers').transaction;
let mustBeAuthenticated = require('../lib/mustBeAuthenticated');

let router = new Router();

router
  .use('/', mustBeAuthenticated)
  .param('transactionById', transaction.params.transactionById)
  .get('/', transaction.getTransactions)
  .post('/', transaction.post)
  .get('/:transactionById', transaction.get)
  .patch('/:transactionById', transaction.patch)
  .del('/:transactionById', transaction.del);
  

module.exports = router.routes();
