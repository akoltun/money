'use strict';

let LocalStrategy = require('passport-local').Strategy;
let co = require('co');

const User = require('../../users/userModel');

let localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {

  class AuthError extends Error {}

  co(function*() {

    let user = yield User.findOne({email: email});

    if (!user || !user.checkPassword(password)) {
      // Ошибка идет в модуль login, func passport.authenticate, переменная info
      throw new AuthError('Email or password wrong');
    }

    return user;

  }).then(
    user => done(null, user),
    err => err instanceof AuthError ? done(null, false, err) : done(err)
  );

});

exports.localStrategy = localStrategy;
