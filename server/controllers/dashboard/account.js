'use strict';

const Account = require('../../models').Account;
const Transaction = require('../../models').Transaction;

module.exports = {

  getAccounts: function*(next) {

    let accounts = yield Account.find({
      user: this.user
    });

    this.body = this.render('accounts', {
      accounts: accounts
    });

  },

  getTransactionsByAccount: function*(next) {

    let transactions = yield Transaction.find({
      user: this.user,
      account: this.params.account
    }).populate('account categories');

    this.body = this.render('transactions', {
      transactions: transactions,
      transactionsTitle: `Транзакции в "${this.params.account.name}"`
    });

  }

};
