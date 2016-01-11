'use strict';

module.exports = function(schema, options) {

  schema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    this.options.new = true;
    next();
  });

  schema.pre('update', function(next) {
    this.options.runValidators = true;
    next();
  });

};
