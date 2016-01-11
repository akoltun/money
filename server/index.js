'use strict';

const app = require('./app');
const config = require('config');

app.listen(config.server.port, config.server.host);