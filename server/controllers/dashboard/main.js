'use strict';

const Transaction = require('../../models').Transaction;
const Account = require('../../models').Account;

module.exports = {

  getStats: function*(next) {

    let accounts = yield Account.find({
      user: this.user,
    }).lean();

    let summary = accounts
      .map(account => account.summary)
      .reduce((a, b) => a + b);
    let pinned = accounts.filter(account => account.pinned);

    this.state.summary = summary;
    this.state.pinnedAccounts = pinned;
    yield * next;

  },

  get: function*(next) {

    let transactions = yield Transaction.find({
      user: this.user
    }).populate('account categories').lean();

    this.body = this.render('dashboard', {
      title: 'Панель управления',
      transactions: transactions
    });

  }

};
