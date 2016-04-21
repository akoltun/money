'use strict';

module.exports = function(routerModulePath) {
  var middleware = null;

  return function*(next) {
    if (!middleware) {
      middleware = module.parent.require(routerModulePath);
    }
    yield* middleware.call(this, next);
  };

};

delete require.cache[__filename];