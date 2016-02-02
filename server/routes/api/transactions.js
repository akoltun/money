'use strict';

const Router = require('koa-router');
let transactionCtrl = require('../../controllers').api.transaction;
let mustBeAuthenticated = require('../../lib/mustBeAuthenticated');

let router = new Router();

router
  .param('transactionById', transactionCtrl.params.transactionById)
  .get('/', transactionCtrl.getTransactions)
  .post('/', transactionCtrl.post)
  .get('/:transactionById', transactionCtrl.get)
  .patch('/:transactionById', transactionCtrl.patch)
  .del('/:transactionById', transactionCtrl.del);
  

module.exports = router.routes();
