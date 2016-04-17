'use strict';

const Account = require('../../models').Account;
const Transaction = require('../../models').Transaction;

module.exports = {

  getAccounts: function*() {

    let accounts = yield Account.find({user: this.user}).lean();

    this.body = this.render('accounts/index', {
      title: 'Kontos',
      accounts: accounts
    });

  },

  getTransactionsByAccount: function*() {

    let transactions = yield Transaction.find({
      user: this.user,
      account: this.params.account
    }).populate('account categories').lean();

    this.body = this.render('transactions/index', {
      title: `Transaktionen in "${this.params.account.name}"`,
      transactions: transactions
    });

  },

  addAccount: function*() {

    this.body = this.render('accounts/addAccount', {title: `Konto hinzufügen`});

  },

  addAccountPost: function*() {

    this.request.body.user = this.user;
    if (!this.request.body.pinned) this.request.body.pinned = false;
    yield Account.create(this.request.body);
    this.redirect('/dashboard/accounts');

  },

  editAccountById: function*() {

    this.body = this.render('accounts/editAccount', {
      title: `Konto '${this.params.account.name}' ändern`,
      account: this.params.account
    });

  },

  editAccountByIdPost: function*() {

    if (!this.request.body.pinned) this.request.body.pinned = false;
    Object.assign(this.params.account, this.request.body);
    yield this.params.account.save();
    this.redirect('/dashboard/accounts');

  },

  deleteAccountById: function*() {

    yield this.params.account.remove();
    this.redirect('/dashboard/accounts');

  }

};