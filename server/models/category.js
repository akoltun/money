'use strict';

/**
 * MODULE DEPENDENCIES.
 */

const mongoose = require('../lib/mongoose');
const co = require('co');
let Category;
/**
 * SCHEMA.
 */

let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Category name can\'t be a empty',
    minLength: 2,
    maxlength: 256,
    trim: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Category can\'t be without user',
    index: true
  },
  transactionsCount : {type : Number,  default : 0},
  spent             : {type : Number,  default : 0}, // Потрачено
  earned            : {type : Number,  default : 0}, // Заработано
  summary           : {type : Number,  default : 0}, // Итого
});

/**
 * MIDDLEWARE.
 */

categorySchema.pre('save', function(next) {
  let category = this;

  co(function*() {
    let isOccupied = yield Category.findOne({
      name: category.name,
      user: category.user
    });

    if (isOccupied) {
      if (String(isOccupied._id) == String(category._id)) return next();
      let err = new mongoose.Error('Category name is occupied');
      err.status = 409;
      throw err;
    }
    return category;
  }).then(next, err => next(err));

});

categorySchema.pre('remove', function(next) {
  let category = this;

  co(function*() {

    yield mongoose.models.Transaction.update(
      {categories: category._id},
      {$pull: {categories: category._id}},
      {multi: true});

    return category;
  }).then(next, next);

});

/**
 * EXPORT.
 */


Category = mongoose.model('Category', categorySchema);

module.exports = Category;

