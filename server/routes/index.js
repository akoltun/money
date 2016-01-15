'use strict';

const Router = require('koa-router');
const router = new Router();

const controllers = require('../controllers');

const api = require('./api');
const dashboard = require('./dashboard');

router
  .get('/', controllers.api.auth.register)
  .get('/login', controllers.api.auth.login.get)
  .post('/login', controllers.api.auth.login.post)
  .get('/logout', controllers.api.auth.logout);

router.use('/transactions/me', api.transactions);
router.use('/accounts/me', api.accounts);
router.use('/categories/me', api.categories);
router.use('/users', api.users);
router.use('/dashboard', dashboard);

module.exports = router;