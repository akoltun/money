// Parse application/json, application/x-www-form-urlencoded
// NOT form/multipart!
'use strict';
const bodyParser = require('koa-bodyparser');
module.exports = bodyParser();
