'use strict';

let LocalStrategy = require('passport-local').Strategy;
let co = require('co');

const User = require('../models/user');

let localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {

  class AuthError extends Error {}

  co(function*() {

    let user = yield User.findOne({email: email});

    if (!user || !user.checkPassword(password)) {
      throw new AuthError('Не верный email или пароль.');//Ошибка идет в модуль login, функция passport.authenticate, переменная info
    }

    return user;

  }).then(
    user => done(null, user),
    err => err instanceof AuthError ? done(null, false, err) : done(err)
  );

});

exports.localStrategy = localStrategy;
