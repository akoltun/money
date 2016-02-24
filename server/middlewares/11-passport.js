'use strict';

const passport = require('koa-passport');
let localStrategy = require('../lib/authStrategy').localStrategy;

const User = require('../models/user');

// При авторизации пишет ID юзера в this.session.passport.user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Какждый раз по id юзера из сессии пишет юзера в req.user
passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

passport.use(localStrategy);

let passportInitialize = passport.initialize();

module.exports = function*(next) {
  Object.defineProperty(this, 'user', {
    get() {
      return this.req.user;
    }
  });

  yield* passportInitialize.call(this, next);

};
