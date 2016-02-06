'use strict';

/**
 * MODULE DEPENDENCIES.
 */

const mongoose = require('../lib/mongoose');
const validator = require('validator');
const co = require('co');

/**
 * SCHEMA.
 */

let accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Account name can\'t be a empty',
    minLength: 2,
    maxlength: 256,
    trim: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Account can\'t be without user',
    index: true
  },
  transactionsCount : {type : Number,  default : 0},
  spent             : {type : Number,  default : 0}, // Потрачено
  earned            : {type : Number,  default : 0}, // Заработано
  summary           : {type : Number,  default : 0}, // Итого
  withdrawal        : {type : Number,  default : 0}, // Снято
  deposits          : {type : Number,  default : 0}, // Пополнено
  pinned            : {type : Boolean, default : true}, // Закрепить
});

/**
 * MIDDLEWARE.
 */

accountSchema.pre('save', function(next) {
  let account = this;

  co(function*() {
    let isOccupied = yield Account.findOne({
      name: account.name,
      user: account.user
    });

    if (isOccupied) {
      if (String(isOccupied._id) == String(account._id)) return next();
      let err = new mongoose.Error('Account name is occupied');
      err.status = 409;
      throw err;
    }
    return account;
  }).then(next, err => next(err));
  
});

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
  }).then(next,console.log);

});

/**
 * EXPORT.
 */


let Account = mongoose.model('Account', accountSchema);

module.exports = Account;

