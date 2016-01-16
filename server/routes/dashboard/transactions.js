'use strict';

const Router = require('koa-router');
const transaction = require('../../controllers').dashboard.transaction;

const router = new Router();

router
  .get('/', transaction.getTransactions);

module.exports = router.routes();