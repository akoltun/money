'use strict';

const Router    = require('koa-router');
let accountCtrl = require('./accountController');
let mustBeAuthenticated = require('auth').mustBeAuthenticated;

let router = new Router();

router
  .use(mustBeAuthenticated)
  .param('id', accountCtrl.params.accountById)
  .get('/', accountCtrl.getAccounts)
  .get('/stats', accountCtrl.getStats)
  .post('/', accountCtrl.post)
  .get('/:id', accountCtrl.getTransactionsByAccount)
  .patch('/:id', accountCtrl.patch)
  .del('/:id', accountCtrl.del);

module.exports = router.routes();
