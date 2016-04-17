'use strict';

const mongoose = require('../../lib/mongoose');
const isValid = mongoose.Types.ObjectId.isValid;

const Account = require('../../models').Account;
const Transaction = require('../../models').Transaction;

module.exports = {

  params: {

    accountById: function*(id, next) {

      if (!isValid(id)) this.throw(404, 'Account not found');
      let account = yield Account.findOne({_id: id,user: this.user});
      if (!account) this.throw(404, 'Account not found');
      this.params.account = account;
      yield* next;

    }

  },

  getAccounts: function*() {

    this.body = yield Account.find({user: this.user}).lean();

  },

  get: function*() {

    this.body = this.params.account.toObject();

  },

  getStats: function*() {

    let accounts = yield Account.find({
      user: this.user
    }).sort({name: 1}).lean();
    let summary = 0;

    if (accounts.length) {
      summary = accounts
        .map(account => account.summary)
        .reduce((a, b) => a + b);
    }

    this.body = {summary: summary, accounts: accounts};

  },

  getTransactionsByAccount: function*() {

    this.body = yield Transaction.find({
      user: this.user,
      account: this.params.account
    }).populate('account categories').lean();

  },

  post: function*() {

    this.request.body.user = this.user;
    let account = yield Account.create(this.request.body);
    this.status = 201;
    this.body = account.toObject();

  },

  patch: function*() {

    Object.assign(this.params.account, this.request.body);
    yield this.params.account.save();
    this.body = this.params.account;

  },

  del: function*() {

    yield this.params.account.remove();
    this.body = this.params.account.toObject();

  }

};
