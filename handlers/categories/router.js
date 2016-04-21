'use strict';

const Router     = require('koa-router');
let categoryCtrl = require('./categoryController');
let mustBeAuthenticated = require('auth').mustBeAuthenticated;

let router = new Router();

router
  .use(mustBeAuthenticated )
  .param('id', categoryCtrl.params.categoryById)
  .get('/', categoryCtrl.getCategories)
  .post('/', categoryCtrl.post)
  .get('/:id', categoryCtrl.getTransactionsByCategory)
  .patch('/:id', categoryCtrl.patch)
  .del('/:id', categoryCtrl.del);

module.exports = router.routes();
