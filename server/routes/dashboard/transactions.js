'use strict';

const Router = require('koa-router');
const transactionCtrl = require('../../controllers').dashboard.transaction;
const transactionAPICtrl = require('../../controllers').api.transaction;

const router = new Router();

router
  .param('id', transactionAPICtrl.params.transactionById)
  .get('/', transactionCtrl.getTransactions)

  .get('/addtransaction', transactionCtrl.addTransaction)
  .post('/addtransaction', transactionCtrl.addTransactionPost)
  .get('/edittransaction/:id', transactionCtrl.editTransactionById)
  .post('/edittransaction/:id', transactionCtrl.editTransactionByIdPost)
  .get('/deletetransaction/:id', transactionCtrl.deleteTransactionById)

  .get('/addtransfer', transactionCtrl.addTransfer)
  .post('/addtransfer', transactionCtrl.addTransactionPost)
  .get('/edittransfer/:id', transactionCtrl.editTransferById)
  .post('/edittransfer/:id', transactionCtrl.editTransactionByIdPost)
  .get('/deletetransfer/:id', transactionCtrl.deleteTransactionById);


module.exports = router.routes();