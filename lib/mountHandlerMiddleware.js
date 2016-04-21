'use strict';

const path = require('path');
const mount = require('koa-mount');

module.exports = (prefix, moduleDir) => {

  let handler = require('lib/lazyRouter')(path.join(moduleDir, 'router'));
  let templateDir = path.join(moduleDir, '/templates');


  function* wrapMiddleware(next) {
    this.templateDir = templateDir;
    try {
      yield* handler.call(this, next);
    } finally {
      delete this.templateDir;
    }
  }

  if (prefix) return mount('/api' + prefix, wrapMiddleware);
  else return mount(handler);

};