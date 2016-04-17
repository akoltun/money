'use strict';

const Router = require('koa-router');
const router = new Router();

let api = require('./api');

router.use('/api', api);

module.exports = router;