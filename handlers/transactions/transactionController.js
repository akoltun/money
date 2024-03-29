'use strict';

const mongoose    = require('lib/db').mongoose;
const isValid     = mongoose.Types.ObjectId.isValid;
const Transaction = require('./transactionModel');
const Account     = require('accounts').Account;
const Category    = require('categories').Category;

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
      .sort({date: -1})
      .populate('account categories sourceAccount destinationAccount')
      .lean();

  },

  get: function*() {

    this.body = this.params.transaction
      .populate('account categories sourceAccount destinationAccount')
      .toObject();

  },

  post: function*() {

    let fields  = this.request.body;
    fields.user = this.user;

    if (fields.type === 'transfer') {

      fields.sourceAccount = yield Account.findOne({
        user: fields.user,
        _id : fields.sourceAccount
      });

      fields.destinationAccount = yield Account.findOne({
        user: fields.user,
        _id : fields.destinationAccount
      });

      if (!fields.sourceAccount || !fields.destinationAccount) {
        this.throw(409, 'Transfer can\'t be without an account');
      }

      if (String(fields.sourceAccount._id) ===
        String(fields.destinationAccount._id)) {
        this.throw(409, 'Transfer can\'t be on the same account');
      }

    }

    if ((fields.type === 'spent') || (fields.type === 'earned')) {
      fields.account = yield Account.findOne({
        user: fields.user,
        _id : fields.account
      });

      fields.categories = yield Category.find({
        user: fields.user,
        _id : {$in: fields.categories}
      });

      if (!fields.account) {
        this.throw(409, 'Transaction can\'t be without an account');
      }
    }

    let transaction = yield Transaction.create(fields);
    this.status     = 201;
    this.body       = transaction.toObject();

  },

  patch: function*() {

    let transaction = this.params.transaction;
    let fields      = this.request.body;

    if (fields.type === 'transfer') {

      fields.sourceAccount = yield Account.findOne({
        user: this.user,
        _id : fields.sourceAccount
      });

      fields.destinationAccount = yield Account.findOne({
        user: this.user,
        _id : fields.destinationAccount
      });

      if (!fields.sourceAccount || !fields.destinationAccount) {
        this.throw(409, 'Transfer can\'t be without an account');
      }

      if (String(fields.sourceAccount._id) ===
        String(fields.destinationAccount._id)) {
        this.throw(409, 'Transfer can\'t be on the same account');
      }

      if (fields.account) delete fields.account;
      if (fields.categories) fields.categories = [];

    }

    if ((fields.type === 'spent') || (fields.type === 'earned')) {
      fields.account    = yield Account.findOne({
        user: this.user,
        _id : fields.account
      });
      fields.categories = yield Category.find({
        user: this.user,
        _id : {$in: fields.categories}
      });

      if (!fields.account) {
        this.throw(409, 'Transaction can\'t be without an account');
      }

      if (fields.sourceAccount) delete fields.sourceAccount;
      if (fields.destinationAccount) delete fields.destinationAccount;
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