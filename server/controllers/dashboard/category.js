'use strict';

const Category = require('../../models').Category;
const Transaction = require('../../models').Transaction;

module.exports = {

  getCategories: function*() {

    let categories = yield Category.find({user: this.user}).lean();

    this.body = this.render('categories/index', {
      title: 'Kategorie',
      categories: categories
    });

  },

  getTransactionsByCategory: function*() {

    let transactions = yield Transaction.find({
      user: this.user,
      categories: this.params.category
    }).populate('account categories').lean();

    this.body = this.render('transactions/index', {
      title: `Transaktionen in "${this.params.category.name}"`,
      transactions: transactions
    });

  },

  addCategory: function*() {

    this.body = this.render('categories/addCategory', {
      title: `Kategorie hinzufügen`
    });

  },

  addCategoryPost: function*() {

    this.request.body.user = this.user;
    yield Category.create(this.request.body);
    this.redirect('/dashboard/categories');

  },

  editCategoryById: function*() {

    this.body = this.render('categories/editCategory', {
      title: `Kategorie '${this.params.category.name}' ändern`,
      category: this.params.category
    });

  },

  editCategoryByIdPost: function*() {

    Object.assign(this.params.category, this.request.body);
    yield this.params.category.save();
    this.redirect('/dashboard/categories');

  },

  deleteCategoryById: function*() {

    yield this.params.category.remove();
    this.redirect('/dashboard/categories');

  }

};
