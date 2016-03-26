'use strict';

const mongoose = require('../../lib/mongoose');
const isValid = mongoose.Types.ObjectId.isValid;
const Category = require('../../models').Category;
const Transaction = require('../../models').Transaction;

module.exports = {

  params: {

    categoryById: function*(id, next) {

      if (!isValid(id)) this.throw(404, 'Category not found');
      let category = yield Category.findOne({_id: id, user: this.user});
      if (!category) this.throw(404, 'Category not found');
      this.params.category = category;
      yield * next;

    }

  },

  getCategories: function*() {

    this.body = yield Category.find({user: this.user}).lean();

  },

  get: function*() {

    this.body = this.params.category.lean();

  },

  getTransactionsByCategory: function*() {

    this.body = yield Transaction.find({
      user: this.user,
      categories: this.params.category
    }).populate('account categories').lean();

  },

  post: function*() {

    this.request.body.user = this.user;
    let category = yield Category.create(this.request.body);
    this.status = 201;
    this.body = {success: true, category: category.toObject()};

  },

  patch: function*() {

    Object.assign(this.params.category, this.request.body);
    yield this.params.category.save();
    this.body = {success: true, category: this.params.category.toObject()};

  },

  del: function*() {

    yield this.params.category.remove();
    this.body = {success: true, category: this.params.category.toObject()};

  }

};
