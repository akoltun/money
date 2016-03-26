'use strict';

const Router = require('koa-router');
let transactionCtrl = require('../../controllers').api.transaction;

let router = new Router();

router
  .param('id', transactionCtrl.params.transactionById)
  .get('/', transactionCtrl.getTransactions)
  .post('/', transactionCtrl.post)
  .get('/:id', transactionCtrl.get)
  .patch('/:id', transactionCtrl.patch)
  .del('/:id', transactionCtrl.del);


module.exports = router.routes();
