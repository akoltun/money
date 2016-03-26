'use strict';

const mongoose = require('./mongoose');
const MongooseStore = require('koa-session-mongoose');
const config = require('config');

module.exports = {
  store: new MongooseStore({
    connection: mongoose,
    collection: 'sessions',
    expires: config.session.cookie.maxAge / 1000 // sec
  })
};