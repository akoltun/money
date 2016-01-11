'use strict';

const mongoose = require('./mongoose');
const mongooseStore = require('koa-session-mongoose');
const config = require('config');

module.exports = {
  store: mongooseStore.create({
    connection: mongoose,
    collection: 'sessions',
    expires: config.session.cookie.maxAge / 1000 //sec
  })
};