'use strict';

const Router = require('koa-router');
const authCtrl = require('../../controllers/api/auth');

let router = new Router();

router
  .get('/', authCtrl.login.get)
  .post('/login', authCtrl.login.post)
  .get('/logout', authCtrl.logout)
  .get('/register', authCtrl.register);

module.exports = router.routes();