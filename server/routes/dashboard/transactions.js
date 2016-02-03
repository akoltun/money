'use strict';

const Router = require('koa-router');
const transactionCtrl = require('../../controllers').dashboard.transaction;
const transactionAPICtrl = require('../../controllers').api.transaction;

const router = new Router();

router
  .param('transactionById', transactionAPICtrl.params.transactionById)
  .get('/', transactionCtrl.getTransactions)
  
  .get('/addtransaction', transactionCtrl.addTransaction)
  .post('/addtransaction', transactionCtrl.addTransactionPost)
  .get('/edittransaction/:transactionById', transactionCtrl.editTransactionById)
  .post('/edittransaction/:transactionById', transactionCtrl.editTransactionByIdPost)
  .get('/deletetransaction/:transactionById', transactionCtrl.deleteTransactionById)

  .get('/addtransfer', transactionCtrl.addTransfer)
  .post('/addtransfer', transactionCtrl.addTransactionPost)
  .get('/edittransfer/:transactionById', transactionCtrl.editTransferById)
  .post('/edittransfer/:transactionById', transactionCtrl.editTransactionByIdPost)
  .get('/deletetransfer/:transactionById', transactionCtrl.deleteTransactionById);


module.exports = router.routes();