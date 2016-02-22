'use strict';

const mongoose = require('../../lib/mongoose');
const isValid = mongoose.Types.ObjectId.isValid;
const Category = require('../../models').Category;
const Transaction = require('../../models').Transaction;

module.exports = {

  params: {

    categoryById: function*(id, next) {

      if (!isValid(id)) this.throw(404, 'Category not found');

      let category = yield Category.findOne({
        _id: id,
        user: this.user
      });

      if (!category) this.throw(404, 'Category not found');

      this.params.category = category;
      yield * next;

    }

  },

  getCategories: function*(next) {

    let categories = yield Category.find({user: this.user}).lean();
    this.body = categories;

  },

  get: function*(next) {

    this.body = this.params.category.lean();

  },

  getCategoryTransactions: function*(next) {

    this.body = yield Transaction.find({
      user: this.user,
      categories: this.params.category
    }).lean();

  },

  post: function*(next) {

    let fields = this.request.body;
    fields.user = this.user;
    let category = yield Category.create(fields);
    this.status = 201;
    this.body = {success: true, category: category.toObject()};

  },

  patch: function*(next) {

    let category = this.params.category;
    let fields = this.request.body;
    Object.assign(category, fields);
    yield category.save();
    this.body = {success: true, category: category.toObject()};

  },

  del: function*(next) {

    yield this.params.category.remove();
    this.body = {success: true, category: this.params.category.toObject()};

  }

};
