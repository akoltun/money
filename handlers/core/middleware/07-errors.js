'use strict';

module.exports = function*(next) {

  try {
    yield* next;
    if (404 == this.response.status && !this.response.body) this.throw(404);
  } catch (err) {

    let preferredType = this.accepts('html', 'text', 'json');
    let redirectPath = '/';

    this.set('X-Content-Type-Options', 'nosniff');
    this.status = err.status || 500;
    this.app.emit('error', err, this);

    if (err.name === 'ValidationError') {
      this.status = 409;
      let errors = [];
      redirectPath = this.session.lastPath;

      for (let field in err.errors) {
        if (typeof err.errors[field].value !== 'object') {
          errors.push(err.errors[field].message);
        }
      }

      if (preferredType === 'json') {
        this.type = 'application/json';
        this.body = {error: errors};
      } else {
        this.newFlash = {success: false, message: errors.join('; ')};
        this.redirect(redirectPath);
      }

      return;
    }

    switch (preferredType) {

      case 'json':
        this.type = 'application/json';
        this.body = {error: err.message};
        break;

      default:
        this.type = 'text/plain';
        this.body = err.message;

    }

  }
};
