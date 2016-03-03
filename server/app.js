'use strict';
if (process.env.NODE_TRACE) require('./lib/trace');

const koa = require('koa');
const config = require('config');
const app = koa();
const middlewares = require('./middlewares');

app.keys = [config.secret];

Object.keys(middlewares).forEach((middleware) => {
  app.use(middlewares[middleware]);
});

module.exports = app;