'use strict';

let oid = require('../lib/db/oid');
require('../models').Category;

module.exports = [{
  _id: oid('job-admin'), // ad04d7845f45aaa0fbc6782c
  name: 'job',
  user: oid('user-admin')
}, {
  _id: oid('movies-admin'), // ad04d7845f45aaa0fbc6782c
  name: 'movies',
  user: oid('user-admin')
}, {
  _id: oid('travel-admin'), // ac6fc13ed97cd12c68a932a3
  name: 'travel',
  user: oid('user-admin')
}, {
  _id: oid('job-google'), // 1e1d972e95041007e9244cd1
  name: 'job',
  user: oid('user-google')
}, {
  _id: oid('movies-google'), // 1e1d972e95041007e9244cd1
  name: 'movies',
  user: oid('user-google')
}, {
  _id: oid('travel-google'), // b29b10b5597f42e93422e762
  name: 'travel',
  user: oid('user-google')
}];