'use strict';

const mongoose    = require('../../lib/mongoose');
const isValid     = mongoose.Types.ObjectId.isValid;
const Transaction = require('../../models').Transaction;
const Account     = require('../../models').Account;
const Category    = require('../../models').Category;
const moment      = require('moment');

module.exports = {

  params: {

    transactionById: function*(id, next) {

      if (!isValid(id)) this.throw(404, 'Transaction not found');

      let transaction = yield Transaction.findOne({_id: id, user: this.user});

      if (!transaction) this.throw(404, 'Transaction not found');
      this.params.transaction = transaction;
      yield* next;

    }

  },

  getTransactions: function*() {

    this.body = yield Transaction.find({user: this.user})
      .sort({date: -1}).lean();

  },

  get: function*() {

    this.body = this.params.transaction.toObject();

  },

  post: function*() {

    let fields = this.request.body;
    fields.user = this.user;

    if (fields.type === 'transfer') {

      fields.sourceAccount = yield Account.findOne({
        user: fields.user,
        name: fields.sourceAccount
      });

      fields.destinationAccount = yield Account.findOne({
        user: fields.user,
        name: fields.destinationAccount
      });

      if (!fields.sourceAccount || !fields.destinationAccount) {
        this.throw(409, 'Transfer can\'t be without an account');
      }

      if (String(fields.sourceAccount._id) ===
          String(fields.destinationAccount._id)) {
        this.throw(409, 'Transfer can\'t be on the same account');
      }

    } else {

      fields.account = yield Account.findOne({
        user: fields.user,
        name: fields.account
      });

      fields.categories = yield Category.find({
        user: fields.user,
        name: {$in: fields.categories}
      });

      if (!fields.account) {
        this.throw(409, 'Transaction can\'t be without an account');
      }

    }

    let transaction = yield Transaction.create(fields);
    this.status = 201;
    this.body = transaction.toObject();

  },

  patch: function*() {

    let transaction = this.params.transaction;
    let fields = this.request.body;

    if (fields.type === 'transfer') {

      fields.sourceAccount = yield Account.findOne({
        user: this.user,
        name: fields.sourceAccount
      });

      fields.destinationAccount = yield Account.findOne({
        user: this.user,
        name: fields.destinationAccount
      });

      if (!fields.sourceAccount || !fields.destinationAccount) {
        this.throw(409, 'Transfer can\'t be without an account');
      }

      if (String(fields.sourceAccount._id) ===
          String(fields.destinationAccount._id)) {
        this.throw(409, 'Transfer can\'t be on the same account');
      }

      if (transaction.account) delete transaction.account;
      if (transaction.categories) delete transaction.categories;
      if (transaction.description) delete transaction.description;

    } else {

      fields.account = yield Account.findOne({
        user: this.user,
        name: fields.account
      });
      fields.categories = yield Category.find({
        user: this.user,
        name: {$in: fields.categories}
      });

      if (!fields.account) {
        this.throw(409, 'Transaction can\'t be without an account');
      }

      if (transaction.sourceAccount) delete transaction.sourceAccount;
      if (transaction.destinationAccount) delete transaction.destinationAccount;

    }

    yield transaction.decreaseCounts();
    Object.assign(transaction, fields);
    yield transaction.save();

    this.body = transaction.toObject();

  },

  del: function*() {

    yield this.params.transaction.remove();
    this.body = this.params.transaction.toObject();

  }

};