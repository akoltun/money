'use strict';

/**
 * MODULE DEPENDENCIES.
 */

const mongoose = require('../lib/mongoose');
const co = require('co');
const uniqueValidator = require('mongoose-unique-validator');
let Category;
/**
 * SCHEMA.
 */

let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Category name can\'t be a empty',
    minlength: 2,
    maxlength: 256,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Category can\'t be without user'
  },
  transactionsCount : {type : Number,  default : 0},
  spent             : {type : Number,  default : 0}, // Потрачено
  earned            : {type : Number,  default : 0}, // Заработано
  summary           : {type : Number,  default : 0} // Итого
});

categorySchema.index({ name: 1, user: 1}, { unique: true });

categorySchema.plugin(uniqueValidator, {
  message: 'Category {PATH}: "{VALUE}" exists'
});

/**
 * MIDDLEWARE.
 */


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

