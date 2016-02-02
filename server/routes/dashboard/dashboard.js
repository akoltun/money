'use strict';

const Router = require('koa-router');
const dashboardCtrl = require('../../controllers').dashboard.main;

let router = new Router();

router
  .get('/', dashboardCtrl.get);
  

module.exports = router.routes();
