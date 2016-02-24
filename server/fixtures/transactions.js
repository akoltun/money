'use strict';

let oid = require('../lib/db/oid');

require('../models').Transaction;

module.exports = [{
  _id: oid('Reise nach Deutschland'), // 3840e9fe60ecf7bda310fdd2
  amount: 3000,
  type: 'spent',
  description: 'Reise nach Deutschland',
  user: oid('user-admin'),
  account: oid('cash-admin'),
  categories: [oid('travel-admin')]
}, {
  _id: oid('Reise nach Russland'), // 91232abb6c478398ec3807bc
  amount: 1000,
  type: 'spent',
  description: 'Reise nach Russland',
  user: oid('user-admin'),
  account: oid('bank-admin'),
  categories: [oid('travel-admin')]
}, {
  _id: oid('Terminator-admin'), // bf76558a4550c8ecf8e1de41
  amount: 500,
  type: 'spent',
  description: 'Terminator',
  user: oid('user-admin'),
  account: oid('cash-admin'),
  categories: [oid('movies-admin')]
}, {
  _id: oid('Gehalt-admin'), // 6e63f4813ccedb168fe4425d
  amount: 10000,
  type: 'earned',
  description: 'Gehalt',
  user: oid('user-admin'),
  account: oid('bank-admin'),
  categories: [oid('job-admin')]
}, {
  _id: oid('Gefunden-admin'), // 443949921cf382a92b830b64
  amount: 5000,
  type: 'earned',
  description: 'Gefunden',
  user: oid('user-admin'),
  account: oid('cash-admin'),
  categories: [oid('job-admin'), oid('travel-admin')]
}, {
  _id: oid('Reise nach Amerika'), // 7ad46b9d697c1bfefdf73f53
  amount: 5000,
  type: 'spent',
  description: 'Reise nach Amerika',
  user: oid('user-google'),
  account: oid('cash-google'),
  categories: [oid('travel-google')]
}, {
  _id: oid('Reise nach Jamaika'), // 03e35a0f63cb880ad165159d
  amount: 500,
  type: 'spent',
  description: 'Reise nach Jamaika',
  user: oid('user-google'),
  account: oid('bank-google'),
  categories: [oid('travel-google')]
}, {
  _id: oid('Titanik-google'), // 84d89247969e67ec4cd2f589
  amount: 700,
  type: 'spent',
  description: 'Titanik',
  user: oid('user-google'),
  account: oid('cash-google'),
  categories: [oid('movies-google')]
}, {
  _id: oid('Gehalt-google'), // 7461e1900055adaea60eb91d
  amount: 15000,
  type: 'earned',
  description: 'Gehalt',
  user: oid('user-google'),
  account: oid('bank-google'),
  categories: [oid('job-google')]
}, {
  _id: oid('Gefunden-google'), // 8869b88ec37bfa60cbbc278a
  amount: 1000,
  type: 'earned',
  description: 'Gefunden',
  user: oid('user-google'),
  account: oid('cash-google'),
  categories: [oid('job-google'), oid('travel-google')]
}];
