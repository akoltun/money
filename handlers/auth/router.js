'use strict';

const Router   = require('koa-router');
const authCtrl = require('./authController');

let router = new Router();

router
  .post('/login', authCtrl.login)
  .get('/logout', authCtrl.logout);

module.exports = router.routes();