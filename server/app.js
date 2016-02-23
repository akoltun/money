'use strict';
if (process.env.NODE_TRACE) require('./lib/trace');

const koa = require('koa');
const config = require('config');
const app = koa();
const middlewares = require('./middlewares');

app.keys = [config.secret];

for (let key in middlewares) {
  if (middlewares.hasOwnProperty(key)) {
    app.use(middlewares[key]);
  }
}

module.exports = app;