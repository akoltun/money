'use strict';

const mongoose = require('../../lib/mongoose');
const isValid = mongoose.Types.ObjectId.isValid;

const User = require('../../models').User;

module.exports = {

  params: {

    userByReq: function*(next) {
      this.params.user = yield User.findById(this.user._id);
      yield * next;
    },
    
    userById: function*(id, next) {

      if (!isValid(id)) this.throw(404, 'User not found');

      let user = yield User.findById(id);
      if (!user) this.throw(404, 'User not found');

      let allowed = false;

      if (['GET', 'OPTIONS', 'HEAD'].find(e => e === this.method)) {
        allowed = true;
      }

      if (this.user) {
        if (String(this.user._id) === String(user._id) || this.user.isAdmin) {
          allowed = true;
        }
      }

      if (allowed) this.params.user = user;
      else this.throw(403, "Not allowed.");
      yield* next;

    }
  },

  getUsers: function*(next) {

    let users = yield User.find();
    this.body = users.map(User.getInfoFields);

  },

  get: function*(next) {

    this.body = this.params.user.getInfoFields();

  },

  post: function*(next) {

    let user = yield User.create(this.request.body);

    this.status = 201;
    this.body = {success: true, user: user.getInfoFields()};

  },

  patch: function*(next) {

    let user = this.params.user;
    let fields = this.request.body;


    if (fields.password) {
      if (user.passwordHash && !user.checkPassword(fields.oldPassword)) {
        this.throw(400, "Old password is wrong.");
      }
    }

    Object.assign(user, fields);
    yield user.save();
    this.body = {success: true, user: user.getInfoFields()};

  },

  del: function*(next) {
    let user = this.params.user;
    yield user.remove();
    this.body = {success: true, user: user.getInfoFields()};

  }

};