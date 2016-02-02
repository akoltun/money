'use strict';

const Router = require('koa-router');
const mustBeAuthenticated = require('../../lib/mustBeAuthenticated');
const router = new Router();

const accounts = require('./accounts');
const categories = require('./categories');
const transactions = require('./transactions');
const users = require('./users');
const auth = require('./auth');

router
  .use(auth)
  .use('/users', users)
  .use('/accounts', mustBeAuthenticated, accounts)
  .use('/categories', mustBeAuthenticated, categories)
  .use('/transactions', mustBeAuthenticated, transactions);

module.exports = router.routes();