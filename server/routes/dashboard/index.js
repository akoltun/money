'use strict';

const Router = require('koa-router');
const mustBeAuthenticated = require('../../lib/mustBeAuthenticated');
const dashboardCtrl = require('../../controllers').dashboard.main;

const router = new Router({
  prefix: '/dashboard'
});

const dashboard = require('./dashboard');
const accounts = require('./accounts');
const categories = require('./categories');
const transactions = require('./transactions');

router
  .use(mustBeAuthenticated, dashboardCtrl.getStats)
  .use(dashboard)
  .use('/accounts', accounts)
  .use('/categories', categories)
  .use('/transactions', transactions);

module.exports = router.routes();