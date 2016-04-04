'use strict';

let oid = require('../lib/db/oid');
require('../models').Account;

module.exports = [{
  _id: oid('cash-admin'), // fe3a2ecc7355a2067448b54e
  name: 'Cash',
  pinned: true,
  user: oid('user-admin')
}, {
  _id: oid('bank-admin'), // 4005d11f015262b8195a4259
  name: 'Bank',
  pinned: true,
  user: oid('user-admin')
}, {
  _id: oid('cash-google'), // e3b6d822b4aaad755e639956
  name: 'Cash',
  pinned: true,
  user: oid('user-google')
}, {
  _id: oid('bank-google'), // fdd8a7bc7d130afb624c34e5
  name: 'Bank',
  pinned: true,
  user: oid('user-google')
}];