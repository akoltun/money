'use strict';

const Transaction = require('../../models').Transaction;
const moment = require('moment');

module.exports = {

  pre: function*(next) {

    this.state.moment = moment;
    yield * next;

  },

  getTransactions: function*(next) {

    let transactions = yield Transaction.find({
      user: this.user
    }).populate('account categories');

    this.body = this.render('transactions', {
      transactions: transactions,
      transactionsTitle: 'Транзакции'
    });

  }

};
