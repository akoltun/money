'use strict';

const Transaction = require('../../models').Transaction;
const Account     = require('../../models').Account;
const Category    = require('../../models').Category;
const moment      = require('moment');

module.exports = {

  getTransactions: function*() {

    let transactions = yield Transaction.find({user: this.user})
      .populate('account categories sourceAccount destinationAccount')
      .sort({date: -1}).lean();

    this.body = this.render('transactions/index', {
      title: 'Transaktionen',
      transactions: transactions
    });

  },

  addTransaction: function*() {

    let transactions = yield Transaction.find({user: this.user})
      .populate('account categories').lean();

    let accounts = yield Account.find({user: this.user}).lean();
    let categories = yield Category.find({user: this.user}).lean();

    this.body = this.render('transactions/addTransaction', {
      title: `Transaction hinzufügen`,
      transactions: transactions,
      accounts: accounts,
      categories: categories
    });

  },

  addTransfer: function*() {

    let transactions = yield Transaction.find({user: this.user})
      .populate('account categories').lean();

    let accounts = yield Account.find({user: this.user}).lean();
    let categories = yield Category.find({user: this.user}).lean();

    this.body = this.render('transactions/addTransfer', {
      title: `Geld Überweisen`,
      transactions: transactions,
      accounts: accounts,
      categories: categories
    });

  },

  addTransactionPost: function*() {

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

      if (String(fields.sourceAccount._id) ===
          String(fields.destinationAccount._id)) {
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
    this.redirect('/dashboard/transactions');

  },

  editTransactionById: function*() {

    let transactions = yield Transaction.find({
      user: this.user
    }).populate('account categories').lean();

    let accounts = yield Account.find({
      user: this.user
    }).lean();

    let categories = yield Category.find({
      user: this.user
    }).lean();

    let transaction = this.params.transaction;

    this.body = this.render('transactions/editTransaction', {
      title: `Transaction ändern`,
      transaction: transaction,
      transactions: transactions,
      accounts: accounts,
      categories: categories
    });

  },

  editTransferById: function*() {

    let transactions = yield Transaction.find({
      user: this.user
    }).populate('sourceAccount destinationAccount').lean();

    let accounts = yield Account.find({
      user: this.user
    }).lean();

    let categories = yield Category.find({
      user: this.user
    }).lean();

    let transaction = this.params.transaction;

    this.body = this.render('transactions/editTransfer', {
      title: `Überweisung ändern`,
      transaction: transaction,
      transactions: transactions,
      accounts: accounts,
      categories: categories
    });

  },

  editTransactionByIdPost: function*() {

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

      if (String(fields.sourceAccount._id) ===
          String(fields.destinationAccount._id)) {
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
    this.redirect('/dashboard/transactions');

  },

  deleteTransactionById: function*() {

    yield this.params.transaction.remove();
    this.redirect('/dashboard/transactions');

  }

};
