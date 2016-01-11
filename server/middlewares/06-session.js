'use strict';
// in-memory store by default (use the right module instead)
const session = require('koa-generic-session');
const sessionStore = require('../lib/sessionStore');

const config = require('config');

const _ = require('lodash');

let options = _.extend(config.session, sessionStore);

module.exports = session(options);