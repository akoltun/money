'use strict';
const mongoose = require('lib/db').mongoose;
const co = require('co');
const config = require('config');
const loadModels = require('lib/db').loadModels;

co(function*() {
  console.log('Starting load models');
  yield* loadModels(config.server.fixtures);
  console.log('Models loaded');
  mongoose.disconnect();
});