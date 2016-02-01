'use strict';
// in-memory store by default (use the right module instead)
const session = require('koa-generic-session');
const sessionStore = require('../lib/sessionStore');

const config = require('config');

Object.assign(config.session, sessionStore);

module.exports = session(config.session);