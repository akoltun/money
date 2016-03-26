'use strict';

const NODE_ENV = process.env.NODE_ENV;
function* no(next) { yield* next; }

module.exports = {
  favicon              : require('./01-favicon'),
  static               : require('./02-static'),
  logger               : (NODE_ENV !== 'testing') ? require('./03-logger') : no,
  templates            : require('./04-templates'),
  session              : require('./05-session'),
  flash                : require('./06-flash'),
  errors               : require('./07-errors'),
  bodyParser           : require('./08-bodyParser'),
  multipartParser      : require('./09-multipartParser'),
  cleanPassportWrapper : require('./10-cleanPassportWrapper'),
  passport             : require('./11-passport'),
  passportSession      : require('./12-passportSession'),
  router               : require('./99-router')
};