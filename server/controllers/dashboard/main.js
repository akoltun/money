'use strict';

const Transaction = require('../../models').Transaction;
const Account = require('../../models').Account;
const Category = require('../../models/').Category;

module.exports = {

  getStats: function*(next) {

    let accounts = yield Account.find({
      user: this.user,
    }).sort({name: 1}).lean();
    let summary = 0;
    let pinned;

    if (accounts.length) {
      summary = accounts
        .map(account => account.summary)
        .reduce((a, b) => a + b);
      pinned = accounts.filter(account => account.pinned);
    }

    this.state.summary = summary;
    this.state.pinnedAccounts = pinned;
    yield * next;

  },

  get: function*(next) {

    let transactions = yield Transaction.find({
      user: this.user
    }).populate('account categories sourceAccount destinationAccount')
      .sort({date: -1}).lean();

    let accounts = yield Account.find({
      user: this.user
    }).lean();

    let categories = yield Category.find({
      user: this.user
    }).lean();

    this.body = this.render('dashboard', {
      title: 'Übersicht',
      transactions: transactions,
      accounts: accounts,
      categories: categories
    });

  }

};
