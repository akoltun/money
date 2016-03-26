'use strict';

const Router = require('koa-router');
let categoryCtrl = require('../../controllers').api.category;

let router = new Router();

router
  .param('id', categoryCtrl.params.categoryById)
  .get('/', categoryCtrl.getCategories)
  .post('/', categoryCtrl.post)
  .get('/:id', categoryCtrl.getTransactionsByCategory)
  .patch('/:id', categoryCtrl.patch)
  .del('/:id', categoryCtrl.del);


module.exports = router.routes();
