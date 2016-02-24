'use strict';

const Account = require('../../models').Account;
const Transaction = require('../../models').Transaction;

module.exports = {

  getAccounts: function*(next) {

    let accounts = yield Account.find({
      user: this.user
    }).lean();

    this.body = this.render('accounts/index', {
      title: 'Kontos',
      accounts: accounts
    });

  },

  getTransactionsByAccount: function*(next) {

    let transactions = yield Transaction.find({
      user: this.user,
      account: this.params.account
    }).populate('account categories').lean();

    this.body = this.render('transactions/index', {
      title: `Transaktionen in "${this.params.account.name}"`,
      transactions: transactions
    });

  },

  addAccount: function*(next) {

    this.body = this.render('accounts/addAccount', {
      title: `Konto hinzufügen`
    });

  },

  addAccountPost: function*(next) {

    let fields = this.request.body;
    fields.user = this.user;
    if (!fields.pinned) fields.pinned = false;
    let account = yield Account.create(fields);
    this.redirect('/dashboard/accounts');

  },

  editAccountById: function*(next) {

    let account = this.params.account;

    this.body = this.render('accounts/editAccount', {
      title: `Konto '${account.name}' ändern`,
      account: account
    });

  },

  editAccountByIdPost: function*(next) {

    let account = this.params.account;
    let fields = this.request.body;
    if (!fields.pinned) fields.pinned = false;
    Object.assign(account, fields);
    yield account.save();
    this.redirect('/dashboard/accounts');

  },

  deleteAccountById: function*(next) {

    yield this.params.account.remove();
    this.redirect('/dashboard/accounts');

  }

};
