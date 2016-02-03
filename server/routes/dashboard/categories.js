'use strict';

const Router = require('koa-router');
const categoryAPICtrl = require('../../controllers').api.category;
const categoryCtrl = require('../../controllers').dashboard.category;

const router = new Router();

router
  .param('categoryById', categoryAPICtrl.params.categoryById)
  .get('/', categoryCtrl.getCategories)
  .get('/:categoryById', categoryCtrl.getTransactionsByCategory)
  .get('/addcategory', categoryCtrl.addCategory)
  .post('/addcategory', categoryCtrl.addCategoryPost)
  .get('/editcategory/:categoryById', categoryCtrl.editCategoryById)
  .post('/editcategory/:categoryById', categoryCtrl.editCategoryByIdPost)
  .get('/deletecategory/:categoryById', categoryCtrl.deleteCategoryById);

module.exports = router.routes();