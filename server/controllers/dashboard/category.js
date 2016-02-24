'use strict';

const Category = require('../../models').Category;
const Transaction = require('../../models').Transaction;

module.exports = {

  getCategories: function*(next) {

    let categories = yield Category.find({
      user: this.user
    }).lean();

    this.body = this.render('categories/index', {
      title: 'Kategorie',
      categories: categories
    });

  },

  getTransactionsByCategory: function*(next) {

    let transactions = yield Transaction.find({
      user: this.user,
      categories: this.params.category
    }).populate('account categories').lean();

    this.body = this.render('transactions/index', {
      title: `Transaktionen in "${this.params.category.name}"`,
      transactions: transactions
    });

  },

  addCategory: function*(next) {

    this.body = this.render('categories/addCategory', {
      title: `Kategorie hinzufügen`
    });

  },

  addCategoryPost: function*(next) {

    let fields = this.request.body;
    fields.user = this.user;
    let category = yield Category.create(fields);
    this.redirect('/dashboard/categories');

  },

  editCategoryById: function*(next) {

    let category = this.params.category;

    this.body = this.render('categories/editCategory', {
      title: `Kategorie '${category.name}' ändern`,
      category: category
    });

  },

  editCategoryByIdPost: function*(next) {

    let category = this.params.category;
    let fields = this.request.body;
    Object.assign(category, fields);
    yield category.save();
    this.redirect('/dashboard/categories');

  },

  deleteCategoryById: function*(next) {

    yield this.params.category.remove();
    this.redirect('/dashboard/categories');

  }

};
