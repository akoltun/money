'use strict';

const Router = require('koa-router');
let router = new Router();

let controllers = require('../controllers');

let users = require('./users');
let accounts = require('./accounts');
let categories = require('./categories');
let transactions = require('./transactions');
// let dashboard = require('./dashboard');


router
  .get('/', controllers.auth.register)
  .get('/login', controllers.auth.login.get)
  .post('/login', controllers.auth.login.post)
  .get('/logout', controllers.auth.logout);

router.use('/transactions/me', transactions);
router.use('/accounts/me', accounts);
router.use('/categories/me', categories);
router.use('/users', users);

module.exports = router;