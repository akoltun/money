'use strict';

const Router = require('koa-router');
const router = new Router();

const dashboard = require('./dashboard');
const accounts = require('./accounts');
const categories = require('./categories');
const transactions = require('./transactions');

router.use('', dashboard);
router.use('/accounts', accounts);
router.use('/categories', categories);
router.use('/transactions', transactions);


module.exports = router.routes();