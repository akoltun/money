'use strict';

const Router = require('koa-router');
const categoryAPICtrl = require('../../controllers').api.category;
const categoryCtrl = require('../../controllers').dashboard.category;

const router = new Router();

router
  .param('categoryById', categoryAPICtrl.params.categoryById)
  .get('/', categoryCtrl.getCategories)
  .get('/:id', categoryCtrl.getTransactionsByCategory)
  .get('/addcategory', categoryCtrl.addCategory)
  .post('/addcategory', categoryCtrl.addCategoryPost)
  .get('/editcategory/:id', categoryCtrl.editCategoryById)
  .post('/editcategory/:id', categoryCtrl.editCategoryByIdPost)
  .get('/deletecategory/:id', categoryCtrl.deleteCategoryById);

module.exports = router.routes();