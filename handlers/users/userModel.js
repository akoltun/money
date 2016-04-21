'use strict';

/**
 * MODULE DEPENDENCIES.
 */

const mongoose = require('lib/db').mongoose;
const crypto = require('crypto');
const config = require('config');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
let User;

/**
 * SCHEMA.
 */

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'E-mail can\'t be empty',
    unique: true,
    lowercase: true,
    trim: true,
    validate: [{
      validator: (val) => validator.isEmail(val),
      msg: 'Email is wrong'
    }]
  },
  passwordHash: {
    type: String
  },
  salt: {
    type: String
  }
}, {timestamps: true});

/**
 * PLUGINS.
 */

userSchema.plugin(uniqueValidator, {
  message: 'Error: {PATH}: {VALUE} exists'
});

/**
 * VIRTUALS.
 */

userSchema.virtual('password')
  .set(function(password) {

    if (password !== undefined) {
      if (password.length < 4) {
        this.invalidate('password',
          'Password should not be less than 4 character');
      }
    }

    this._plainPassword = password;

    if (password) {
      this.salt = crypto.randomBytes(config.crypto.hash.length)
        .toString('base64');
      this.passwordHash = passwordHash(password, this.salt);
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }

  })
  .get(function() {
    return this._plainPassword;
  });

/**
 * MIDDLEWARES.
 */


/**
 * METHODS.
 */

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  if (!this.passwordHash) return false;

  return passwordHash(password, this.salt) == this.passwordHash;
};

userSchema.methods.getInfoFields = function() {
  return User.getInfoFields(this);
};

/**
 * STATICS.
 */

userSchema.statics.getInfoFields = function(user) {
  return {
    _id: user._id,
    email: user.email,
    hasPassword: Boolean(user.passwordHash),
    created: user.created
  };
};

User = mongoose.model('User', userSchema);

function passwordHash(password, salt) {
  let iterations = config.crypto.hash.iterations;
  let length = config.crypto.hash.length;
  return crypto.pbkdf2Sync(password, salt, iterations, length);
}

/**
 * EXPORT.
 */

module.exports = User;
