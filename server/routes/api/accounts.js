'use strict';

const Router = require('koa-router');
let accountCtrl = require('../../controllers').api.account;

let router = new Router();

router
  .param('id', accountCtrl.params.accountById)
  .get('/', accountCtrl.getAccounts)
  .post('/', accountCtrl.post)
  .get('/:id', accountCtrl.getTransactionsByAccount)
  .patch('/:id', accountCtrl.patch)
  .del('/:id', accountCtrl.del);


module.exports = router.routes();
