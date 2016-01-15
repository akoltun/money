'use strict';

const Router = require('koa-router');
const dashboard = require('../../controllers').dashboard.dashboard;
const mustBeAuthenticated = require('../../lib/mustBeAuthenticated');

let router = new Router();

router
  .use('/', mustBeAuthenticated)
  .get('/', dashboard.get);

module.exports = router.routes();