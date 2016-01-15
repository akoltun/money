'use strict';

const mongoose = require('../../lib/mongoose');
const isValid = mongoose.Types.ObjectId.isValid;

const Account = require('../../models').Account;
const Transaction = require('../../models').Transaction;

module.exports = {

  params: {

    accountById: function*(id, next) {

      if (!isValid(id)) this.throw(404, 'Account not found');

      let account = yield Account.findOne({
        _id: id,
        user: this.user
      });

      if (!account) this.throw(404, 'Account not found');

      this.params.account = account;
      yield * next;

    }

  },

  getAccounts: function*(next) {

    let accounts = yield Account.find({user: this.user});
    this.body = accounts;

  },

  get: function*(next) {

    this.body = this.params.account;

  },

  getAccountTransactions: function*(next) {

    this.body = yield Transaction.find({
      user: this.user,
      account: this.params.account
    });

  },

  post: function*(next) {

    let fields = this.request.body;
    fields.user = this.user;
    let account = yield Account.create(fields);
    this.status = 201;
    this.body = {success: true, account: account};

  },

  patch: function*(next) {

    let account = this.params.account;
    let fields = this.request.body;
    Object.assign(account, fields);
    yield account.save();
    this.body = {success: true, account: account};

  },

  del: function*(next) {

    yield this.params.account.remove();
    this.body = {success: true, account: this.params.account};

  }

};
