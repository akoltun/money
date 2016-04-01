'use strict';

/**
 * MODULE DEPENDENCIES.
 */

const mongoose = require('../lib/mongoose');
const validator = require('validator');
const co = require('co');
const uniqueValidator = require('mongoose-unique-validator');
let Account;

/**
 * SCHEMA.
 */

let accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Account name can\'t be a empty',
    minlength: 2,
    maxlength: 256,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Account can\'t be without user'
  },
  transactionsCount : {type : Number,  default : 0},
  spent             : {type : Number,  default : 0}, // Потрачено
  earned            : {type : Number,  default : 0}, // Заработано
  summary           : {type : Number,  default : 0}, // Итого
  withdrawal        : {type : Number,  default : 0}, // Снято
  deposits          : {type : Number,  default : 0}, // Пополнено
  pinned            : {type : Boolean, default : false}, // Закрепить
});

accountSchema.index({ name: 1, user: 1}, { unique: true });

accountSchema.plugin(uniqueValidator, {
  message: 'Account {PATH}: "{VALUE}" exists'
});

/**
 * MIDDLEWARE.
 */

accountSchema.pre('remove', function(next) {
  let account = this;

  co(function*() {

    let transactions = yield mongoose.models.Transaction.find({
      user: account.user,
      account: account._id
    });

    for (let transaction of transactions) {
      yield transaction.remove();
    }

    return account;
  }).then(next, next);

});

/**
 * EXPORT.
 */


Account = mongoose.model('Account', accountSchema);

module.exports = Account;

