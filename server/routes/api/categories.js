'use strict';

const Router = require('koa-router');
let category = require('../../controllers').api.category;
let mustBeAuthenticated = require('../../lib/mustBeAuthenticated');

let router = new Router();

router
  .use('/', mustBeAuthenticated)
  .param('categoryById', category.params.categoryById)
  .get('/', category.getCategories)
  .post('/', category.post)
  .get('/:categoryById', category.getCategoryTransactions)
  .patch('/:categoryById', category.patch)
  .del('/:categoryById', category.del);
  

module.exports = router.routes();
