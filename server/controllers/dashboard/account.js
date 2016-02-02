'use strict';

const Account = require('../../models').Account;
const Transaction = require('../../models').Transaction;

module.exports = {

  getAccounts: function*(next) {

    let accounts = yield Account.find({
      user: this.user
    }).lean();

    this.body = this.render('accounts', {
      title: 'Kontos',
      accounts: accounts
    });

  },

  getTransactionsByAccount: function*(next) {

    let transactions = yield Transaction.find({
      user: this.user,
      account: this.params.account
    }).populate('account categories').lean();

    this.body = this.render('transactions', {
      title: `Transaktionen in "${this.params.account.name}"`,
      transactions: transactions
    });

  },

  editAccountById: function*(next) {

    let account = this.params.account;

    this.body = this.render('editAccount', {
      title: `Konto '${account.name}' ändern`,
      account: account
    });
    
  }

};
