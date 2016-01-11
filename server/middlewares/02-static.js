'use strict';
const serve = require('koa-static');
const config = require('config');

const dir = config.server.public;

module.exports = serve(dir);
