'use strict';

const NODE_ENV = process.env.NODE_ENV;
function* nope(next) {
  yield* next;
}

module.exports = {
  favicon              : require('./01-favicon'),
  static               : require('./02-static'),
  logger               : (NODE_ENV !== "testing") ? require('./03-logger') : nope,
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