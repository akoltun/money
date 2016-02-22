'use strict';

/**
 * MODULE DEPENDENCIES.
 */

const mongoose = require('../lib/mongoose');
const co = require('co');

/**
 * SCHEMA.
 */

let transactionSchema = new mongoose.Schema({
  amount: {type: Number, default: 0},
  type: {
    type: String,
    index: true,
    enum: {
      values: ['spent', 'earned', 'transfer'],
      message: 'Unknown type of transaction'
    }
  },
  description: {
    type: String,
    maxlength: 150,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Transaction can\'t be without user',
    index: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    index: true
  },
  sourceAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    index: true
  },
  destinationAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    index: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    index: true
  }],
  date: {
    type: Date,
    default: Date.now
  }
});


/**
 * METHODS.
 */

transactionSchema.methods.increaseCounts = function*() {

  if (this.type === 'transfer') {

    yield mongoose.models.Account.findByIdAndUpdate(this.sourceAccount, {
      $inc: {withdrawal: this.amount, summary: -this.amount}
    });

    yield mongoose.models.Account.findByIdAndUpdate(this.destinationAccount, {
      $inc: {deposits: this.amount, summary: this.amount}
    });

    return this;
  }

  let spent = this.type === 'spent' ? this.amount : 0;
  let earned = this.type === 'earned' ? this.amount : 0;
  let summary = earned - spent;

  yield mongoose.models.Account.findByIdAndUpdate(this.account, {
    $inc: {spent: spent, earned: earned, summary: summary, transactionsCount: 1}
  });

  yield mongoose.models.Category.update(
    {_id: {$in: this.categories}}, //Условия поиска
    {$inc: {spent: spent, earned: earned, summary: summary, transactionsCount: 1}}, //Что изменить
    {multi: true});

  return this;

};

transactionSchema.methods.decreaseCounts = function*() {

  if (this.type === 'transfer') {

    yield mongoose.models.Account.findByIdAndUpdate(this.sourceAccount, {
      $inc: {withdrawal: -this.amount, summary: this.amount}
    });

    yield mongoose.models.Account.findByIdAndUpdate(this.destinationAccount, {
      $inc: {deposits: -this.amount, summary: -this.amount}
    });

    return this;
  }

  let spent = this.type === 'spent' ? this.amount : 0;
  let earned = this.type === 'earned' ? this.amount : 0;
  let summary = earned - spent;

  yield mongoose.models.Account.findByIdAndUpdate(this.account, {
    $inc: {spent: -spent, earned: -earned, summary: -summary, transactionsCount: -1}
  });

  yield mongoose.models.Category.update(
    {_id: {$in: this.categories}},
    {$inc: {spent: -spent, earned: -earned, summary: -summary, transactionsCount: -1}},
    {multi: true});

  return this;
  
};

/**
 * MIDDLEWARE.
 */

transactionSchema.post('save', function(next) {
  let transaction = this;

  co(function*() {
    yield transaction.increaseCounts();
    return transaction;
  }).then(next, err => next(err));

});

transactionSchema.post('remove', function(next) {
  let transaction = this;

  co(function*() {
    yield transaction.decreaseCounts();
    return transaction;
  }).then(next, console.log);

});

/**
 * EXPORT.
 */

let Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
