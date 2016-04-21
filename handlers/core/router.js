'use strict';

const compose = require('koa-compose');
const NODE_ENV = process.env.NODE_ENV;
function* no(next) { yield* next; }

module.exports = compose([
  require('./middleware/01-favicon'),
  require('./middleware/02-static'),
  (NODE_ENV !== 'testing') ? require('./middleware/03-logger') : no,
  require('./middleware/04-templates'),
  require('./middleware/05-session'),
  require('./middleware/06-flash'),
  require('./middleware/07-errors'),
  require('./middleware/08-bodyParser'),
  require('./middleware/09-multipartParser'),
  require('./middleware/10-cleanPassportWrapper'),
  require('./middleware/11-passport'),
  require('./middleware/12-passportSession')
]);