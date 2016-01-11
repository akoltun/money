'use strict';

const passport = require('koa-passport');

module.exports = {

  login: {

    get: function*() {

      this.body = this.render('login', {
        title: 'Войти',
      });

    },

    post: function*(next) {

      let ctx = this;

      if (!this.request.body.email) this.throw(400, 'Укажите email');
      if (!this.request.body.password) this.throw(400, 'Укажите пароль');

      yield passport.authenticate('local', function*(err, user, info) {
        if (err) throw err;

        if (user === false) {
          return ctx.throw(401, info); //можно изменить на flash собщения
        } else {
          yield ctx.login(user);
          ctx.body = {
            success: true
          };
        }

      }).call(this, next);

    }

  },

  logout: function*() {
    //cookies.set( name, [ value ], [ options ] ) - без value удаляет
    // this.cookies.set('sid');
    // this.cookies.set('sid.sig');

    if (this.session.socketIds) {
      this.session.socketIds.forEach((socketId) => {
        this.app.io.socketEmitter.to(socketId).emit('logout');
      });
    }

    this.logout();
    //this.session = null;
    this.redirect('/');

  },

  register: function*() {

    this.body = this.render('frontpage', {
      title: 'Зарегистрироваться',
    });

  }

};
