'use strict';

const Router = require('koa-router');
const category = require('../../controllers').api.category;
const categoryCtrl = require('../../controllers').dashboard.category;
const transactionCtrl = require('../../controllers').dashboard.transaction;
const mustBeAuthenticated = require('../../lib/mustBeAuthenticated');

const router = new Router();

router
  .param('categoryById', category.params.categoryById)
  .use('/', mustBeAuthenticated, transactionCtrl.pre)
  .get('/', categoryCtrl.getCategories)
  .get('/:categoryById', categoryCtrl.getTransactionsByCategory);

module.exports = router.routes();