'use strict';

const Router            = require('koa-router');
let userCtrl            = require('./userController');
let mustBeAuthenticated = require('auth').mustBeAuthenticated;

let router = new Router();

router
// by Request, NOT ID.
  .use('/me', mustBeAuthenticated, userCtrl.params.userByReq)
  .get('/me', userCtrl.get)
  .patch('/me', userCtrl.patch)
  .del('/me', userCtrl.del);

router
  .post('/', userCtrl.post);

module.exports = router.routes();
