'use strict';

const Router = require('koa-router');
const categoryAPICtrl = require('../../controllers').api.category;
const categoryCtrl = require('../../controllers').dashboard.category;

const router = new Router();

router
  .param('categoryById', categoryAPICtrl.params.categoryById)
  .get('/', categoryCtrl.getCategories)
  .get('/:categoryById', categoryCtrl.getTransactionsByCategory);

module.exports = router.routes();