'use strict';

module.exports = function*(next) {
  if (this.isAuthenticated()) yield* next;
  else this.throw(403, 'Forbidden, authorization required');
};
