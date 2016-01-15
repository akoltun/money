'use strict';

module.exports = {

  get: function*(next) {

    this.body = this.render('dashboard');

  }

};
