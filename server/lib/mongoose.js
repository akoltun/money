'use strict';
const mongoose = require('mongoose');
const config = require('config');

if (process.env.MONGOOSE_DEBUG) mongoose.set('debug', true);

mongoose.connect(config.mongoose.url, config.mongoose.options);

module.exports = mongoose;