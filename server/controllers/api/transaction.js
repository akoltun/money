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

      let transaction = yield Transaction.findOne({
        _id: id,
        user: this.user
      }).populate('account categories sourceAccount destinationAccount');

      if (!transaction) this.throw(404, 'Transaction not found');
      this.params.transaction = transaction;
      yield* next;

    }

  },

  getTransactions: function*(next) {

    let transaction = yield Transaction.find({user: this.user})
      .sort({date: -1}).lean();
    this.body = transaction;

  },

  get: function*(next) {

    this.body = this.params.transaction;

  },

  post: function*(next) {

    let fields = this.request.body;
    fields.user = this.user;
    
    if (fields.date) {
      fields.date = +new Date(fields.date) +
        (new Date() - new Date(fields.date));
    }

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

      if (String(fields.sourceAccount._id) === String(fields.destinationAccount._id)) {
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
    this.body = {success: true, transaction: transaction};

  },

  patch: function*(next) {

    let transaction = this.params.transaction;
    let fields = this.request.body;

    if (moment(fields.date).format('YYYY-MM-DD') ===
        moment().format('YYYY-MM-DD')) {
      delete fields.date;
    }

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

      if (String(fields.sourceAccount._id) === String(fields.destinationAccount._id)) {
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

    this.body = {success: true, transaction: transaction};

  },

  del: function*(next) {

    yield this.params.transaction.remove();
    this.body = {success: true, transaction: this.params.transaction};

  }

};