'use strict';
if (process.env.NODE_TRACE) require('lib/trace');

const koa = require('koa');
const config = require('config');
const app = koa();

app.keys = [config.secret];

config.handlers.forEach((handler) => {
  require(handler).init(app);
});

module.exports = app;