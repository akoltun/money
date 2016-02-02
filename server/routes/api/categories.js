'use strict';

const Router = require('koa-router');
let categoryCtrl = require('../../controllers').api.category;
let mustBeAuthenticated = require('../../lib/mustBeAuthenticated');

let router = new Router();

router
  .param('categoryById', categoryCtrl.params.categoryById)
  .get('/', categoryCtrl.getCategories)
  .post('/', categoryCtrl.post)
  .get('/:categoryById', categoryCtrl.getCategoryTransactions)
  .patch('/:categoryById', categoryCtrl.patch)
  .del('/:categoryById', categoryCtrl.del);
  

module.exports = router.routes();
