'use strict';
if (process.env.TRACE) {
  require('./libs/trace');
}

const koa = require('koa');
const config = require('config');
const app = koa();
const middlewares = require('./middlewares');

app.keys = [config.secret];

app.use(middlewares.favicon);
app.use(middlewares.static);
if (process.env.NODE_ENV !== 'testing') app.use(middlewares.logger);
app.use(middlewares.templates);
app.use(middlewares.errors);
app.use(middlewares.session);
app.use(middlewares.bodyParser);
app.use(middlewares.multipartParser);
app.use(middlewares.cleanPassportWrapper);
app.use(middlewares.passport);
app.use(middlewares.passportSession);
app.use(middlewares.flash);
app.use(middlewares.router);

module.exports = app;