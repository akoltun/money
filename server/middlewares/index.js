'use strict';

module.exports = {
  favicon              : require('./01-favicon'),
  static               : require('./02-static'),
  logger               : require('./03-logger'),
  templates            : require('./04-templates'),
  errors               : require('./05-errors'),
  session              : require('./06-session'),
  bodyParser           : require('./07-bodyParser'),
  multipartParser      : require('./08-multipartParser'),
  cleanPassportWrapper : require('./09-cleanPassportWrapper'),
  passport             : require('./10-passport'),
  passportSession      : require('./11-passportSession'),
  flash                : require('./12-flash'),
  router               : require('./99-router')
};