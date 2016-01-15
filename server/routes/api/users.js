'use strict';

const Router = require('koa-router');
let user = require('../../controllers').api.user;
let mustBeAuthenticated = require('../../lib/mustBeAuthenticated');

let router = new Router();

router
  .use('/me', mustBeAuthenticated, user.params.userByReq)
  .get('/me', user.get)
  .patch('/me', user.patch)
  .del('/me', user.del);

router
  .post('/', user.post);

module.exports = router.routes();
