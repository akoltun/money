'use strict';

const Transaction = require('../../models').Transaction;

module.exports = {

  getTransactions: function*(next) {

    let transactions = yield Transaction.find({
      user: this.user
    }).populate('account categories').lean();

    this.body = this.render('transactions', {
      title: 'Transaktionen',
      transactions: transactions
    });

  }

};
