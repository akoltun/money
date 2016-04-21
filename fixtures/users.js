'use strict';

let oid = require('lib/db').oid;
require('users').User;

module.exports = [{
  _id: oid('user-admin'), // 7c10223c510628f39d16c4eb
  email: 'admin@google.com',
  password: 'admin'
}, {
  _id: oid('user-google'), // c7a4e5d2afd2dc844a9c2f23
  email: 'google@google.com',
  password: 'google'
}];