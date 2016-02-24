'use strict';

const app = require('../app');
let request = require('co-request');
const loadModels = require('../lib/db/loadModels');
const fixtures = require('../fixtures');
let server;

request = request.defaults({
  jar: true
});

function getURL(path) {
  return `http://localhost:3005${path}`;
}

describe('Transaction REST API', () => {

  before(() => {
    server = app.listen(3005, '127.0.0.1');
  });

  after(() => {
    server.close();
  });

  beforeEach(function*() {
    yield * loadModels(fixtures);

    yield request({
      method: 'post',
      url: getURL('/login'),
      json: true,
      body: {
        email: fixtures.User[0].email,
        password: fixtures.User[0].password
      }
    });
  });

  afterEach(function*() {
    yield request({
      method: 'get',
      url: getURL('/logout'),
      json: true
    });
  });

  let newTransactionData = {
    amount: 2850,
    description: 'Casino',
    type: 'spent',
    account: fixtures.Account[0].name,
    categories: [fixtures.Category[0].name]
  };

  describe('PARAMS', () => {

    it('returns 404 if transaction not exist', function*() {
      let response = yield request({
        method: 'get',
        url: getURL('/transactions/fe3a2ecc7355a20674486789'),
        json: true
      });
      response.statusCode.should.eql(404);
      response.body.error.should.eql('Transaction not found');
    });

    it('returns 403 if user not authorized', function*() {
      yield request({
        method: 'get',
        url: getURL('/logout'),
        json: true
      });

      let response = yield request({
        method: 'get',
        url: getURL('/transactions/' + fixtures.Account[0]._id),
        json: true
      });
      response.statusCode.should.eql(403);
      response.body.error.should.eql('Forbidden, authorization required');
    });

  });

  describe('POST /transactions', () => {

    it('creates transaction', function*() {
      let response = yield request({
        method: 'post',
        url: getURL('/transactions'),
        json: true,
        body: newTransactionData
      });
      response.statusCode.should.eql(201);
      response.body.success.should.eql(true);
      response.body.transaction.amount.should.eql(+newTransactionData.amount);
      response.body.transaction.account.name.should
        .eql(newTransactionData.account);
      response.body.transaction.account._id.should.eql(fixtures.Account[0]._id);
      response.body.transaction.categories[0]._id.should
        .eql(fixtures.Category[0]._id);
      response.body.transaction.user._id.should.eql(fixtures.User[0]._id);
    });

  });

  describe('GET /transactions', () => {

    it('returns transactions to user', function*() {
      let response = yield request({
        method: 'get',
        url: getURL('/transactions'),
        json: true
      });
      response.statusCode.should.eql(200);
      response.body.length.should.eql(5);
    });

  });

  describe('GET /transaction/:id', () => {

    it('returns single transaction by id', function*() {
      let response = yield request({
        method: 'get',
        url: getURL('/transactions/' + fixtures.Transaction[0]._id),
        json: true
      });
      response.statusCode.should.eql(200);
      response.body._id.should.eql(fixtures.Transaction[0]._id);
    });

  });

  describe('PATCH /transactions/:id', () => {

    it('modified transaction', function*() {

      let response = yield request({
        method: 'patch',
        url: getURL('/transactions/' + fixtures.Transaction[0]._id),
        json: true,
        body: newTransactionData
      });
      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
      response.body.transaction._id.should.eql(fixtures.Transaction[0]._id);
      response.body.transaction.amount.should.eql(newTransactionData.amount);
      response.body.transaction.description.should
        .eql(newTransactionData.description);
      response.body.transaction.account.name.should
        .eql(newTransactionData.account);
      response.body.transaction.categories.length.should.eql(1);
    });

  });

  describe('DELETE /transactions/:id', () => {

    it('delete account', function*() {
      let response = yield request({
        method: 'delete',
        url: getURL('/transactions/' + fixtures.Transaction[0]._id),
        json: true,
      });
      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
    });

  });

});
