'use strict';

module.exports = function*(next) {

  try {
    yield * next;
    if (404 == this.response.status && !this.response.body) this.throw(404);
  } catch (err) {

    let preferredType = this.accepts('html', 'text', 'json');

    this.set('X-Content-Type-Options', 'nosniff');
    this.status = err.status || 500;
    // this.app.emit('error', err, this);

    if (err.name === 'ValidationError') {
      this.status = 400;
      let errors = [];

      for (let field in err.errors) {
        errors.push(err.errors[field].message);
      }

      if (preferredType === 'json') {
        this.type = 'application/json';
        this.body = {errors: errors};
      } else {
        this.body = 'Bad data';
      }

      return;
    }

    switch (preferredType) {

      case 'html':
        this.type = 'text/html';
        this.body = this.render('error', {
          message: err.message,
          status: this.status,
          stack: this.app.env === 'development' ? err.stack : null
        });
        break;

      case 'json':
        this.type = 'application/json';
        this.body = {
          error: err.message
        };
        break;

      default:
        this.type = 'text/plain';
        this.body = err.message;

    }

  }
};
