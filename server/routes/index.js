'use strict';

const Router = require('koa-router');
const router = new Router();

let dashboard = require('./dashboard');
let api = require('./api');

router.use(api);
router.use(dashboard);

module.exports = router;