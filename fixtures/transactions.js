'use strict';

let oid = require('lib/db').oid;

require('transactions').Transaction;

module.exports = [{
  _id: oid('Reise nach Deutschland'), // 3840e9fe60ecf7bda310fdd2
  date: new Date(2015, 1, 1),
  amount: 3000,
  type: 'spent',
  description: 'Reise nach Deutschland',
  user: oid('user-admin'),
  account: oid('cash-admin'),
  categories: [oid('travel-admin')]
}, {
  _id: oid('Reise nach Russland'), // 91232abb6c478398ec3807bc
  date: new Date(2015, 2, 1),
  amount: 1000,
  type: 'spent',
  description: 'Reise nach Russland',
  user: oid('user-admin'),
  account: oid('bank-admin'),
  categories: [oid('travel-admin')]
}, {
  _id: oid('Terminator-admin'), // bf76558a4550c8ecf8e1de41
  date: new Date(2015, 3, 1),
  amount: 500,
  type: 'spent',
  description: 'Terminator',
  user: oid('user-admin'),
  account: oid('cash-admin'),
  categories: [oid('movies-admin')]
}, {
  _id: oid('Gehalt-admin'), // 6e63f4813ccedb168fe4425d
  date: new Date(2015, 4, 1),
  amount: 10000,
  type: 'earned',
  description: 'Gehalt',
  user: oid('user-admin'),
  account: oid('bank-admin'),
  categories: [oid('job-admin')]
}, {
  _id: oid('Gefunden-admin'), // 443949921cf382a92b830b64
  date: new Date(2015, 5, 1),
  amount: 5000,
  type: 'earned',
  description: 'Gefunden',
  user: oid('user-admin'),
  account: oid('cash-admin'),
  categories: [oid('job-admin'), oid('travel-admin')]
}, {
  _id: oid('Reise nach Amerika'), // 7ad46b9d697c1bfefdf73f53
  date: new Date(2015, 6, 1),
  amount: 5000,
  type: 'spent',
  description: 'Reise nach Amerika',
  user: oid('user-google'),
  account: oid('cash-google'),
  categories: [oid('travel-google')]
}, {
  _id: oid('Reise nach Jamaika'), // 03e35a0f63cb880ad165159d
  date: new Date(2015, 7, 1),
  amount: 500,
  type: 'spent',
  description: 'Reise nach Jamaika',
  user: oid('user-google'),
  account: oid('bank-google'),
  categories: [oid('travel-google')]
}, {
  _id: oid('Titanik-google'), // 84d89247969e67ec4cd2f589
  date: new Date(2015, 8, 1),
  amount: 700,
  type: 'spent',
  description: 'Titanik',
  user: oid('user-google'),
  account: oid('cash-google'),
  categories: [oid('movies-google')]
}, {
  _id: oid('Gehalt-google'), // 7461e1900055adaea60eb91d
  date: new Date(2015, 9, 1),
  amount: 15000,
  type: 'earned',
  description: 'Gehalt',
  user: oid('user-google'),
  account: oid('bank-google'),
  categories: [oid('job-google')]
}, {
  _id: oid('Gefunden-google'), // 8869b88ec37bfa60cbbc278a
  date: new Date(2015, 10, 1),
  amount: 1000,
  type: 'earned',
  description: 'Gefunden',
  user: oid('user-google'),
  account: oid('cash-google'),
  categories: [oid('job-google'), oid('travel-google')]
}];
