'use strict';

const passport = require('koa-passport');

module.exports = {

  login: {

    get: function*() {

      if (this.isAuthenticated()) return this.redirect('/dashboard');
      this.body = this.render('login', {title: 'Einloggen'});

    },

    post: function*(next) {

      let ctx = this;

      if (!this.request.body.email) this.throw(400, 'Email is required');
      if (!this.request.body.password) this.throw(400, 'Password is required');

      yield passport.authenticate('local', function*(err, user, info) {
        if (err) throw err;

        if (user === false) {
          return ctx.throw(401, info);
        }

        yield ctx.login(user);
        ctx.body = {success: true, user: user.getInfoFields()};

      }).call(this, next);

    }

  },

  logout: function*() {
    // cookies.set( name, [ value ], [ options ] ) - без value удаляет
    // this.cookies.set('sid');
    // this.cookies.set('sid.sig');
    this.logout();
    // this.session = null;
    this.body = {success: true};

  },

  register: function*() {
    this.body = this.render('register', {title: 'Anmelden'});
  }

};
