'use strict';

const Category = require('../../models').Category;
const Transaction = require('../../models').Transaction;

module.exports = {

  getCategories: function*(next) {

    let categories = yield Category.find({
      user: this.user
    }).lean();

    this.body = this.render('categories', {
      title: 'Kategorie',
      categories: categories
    });

  },

  getTransactionsByCategory: function*(next) {

    let transactions = yield Transaction.find({
      user: this.user,
      categories: this.params.category
    }).populate('account categories').lean();

    this.body = this.render('transactions', {
      title: `Transaktionen in "${this.params.category.name}"`,
      transactions: transactions
    });

  }

};
