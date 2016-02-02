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
  return `http://localhost:3003${path}`;
}

describe('Account REST API', () => {

  before(() => {
    server = app.listen(3003, '127.0.0.1');
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

  let newAccountData = {
    name: 'newBank'
  };

  describe('PARAMS', () => {

    it('returns 404 if account not exist', function*() {
      let response = yield request({
        method: 'get',
        url: getURL('/accounts/fe3a2ecc7355a20674486789'),
        json: true
      });
      response.statusCode.should.eql(404);
      response.body.error.should.eql('Account not found');
    });

    it('returns 403 if user not authorized', function*() {
      yield request({
        method: 'get',
        url: getURL('/logout'),
        json: true
      });

      let response = yield request({
        method: 'get',
        url: getURL('/accounts/' + fixtures.Account[0]._id),
        json: true
      });
      response.statusCode.should.eql(403);
      response.body.error.should.eql('Forbidden, authorization required');
    });

  });

  describe('POST /accounts', () => {

    it("creates account", function*() {
      let response = yield request({
        method: 'post',
        url: getURL('/accounts'),
        json: true,
        body: newAccountData
      });
      response.statusCode.should.eql(201);
      response.body.success.should.eql(true);
      response.body.account.name.should.eql(newAccountData.name);
      response.body.account.user._id.should.eql(fixtures.User[0]._id);
    });

  });

  describe('GET /accounts', () => {

    it('returns accounts to user', function*() {
      let response = yield request({
        method: 'get',
        url: getURL('/accounts'),
        json: true
      });
      response.statusCode.should.eql(200);
      response.body.length.should.eql(2);
      response.body[0].name.should.eql(fixtures.Account[0].name);
      response.body[1].name.should.eql(fixtures.Account[1].name);
    });

  });

  describe('GET /accounts/:id', () => {

    it('returns transactions by account to user', function*() {
      let response = yield request({
        method: 'get',
        url: getURL('/accounts/' + fixtures.Account[0]._id),
        json: true
      });
      response.statusCode.should.eql(200);
      response.body.length.should.eql(3);
      response.body[0].account.should.eql(fixtures.Account[0]._id);
      response.body[1].account.should.eql(fixtures.Account[0]._id);
      response.body[2].account.should.eql(fixtures.Account[0]._id);
    });

  });

  describe('PATCH /accounts/:id', () => {

    it('modified account', function*() {
      let response = yield request({
        method: 'patch',
        url: getURL('/accounts/' + fixtures.Account[0]._id),
        json: true,
        body: newAccountData
      });
      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
      response.body.account.user.should.eql(fixtures.User[0]._id);
    });

    it('returns 409 if account name is isOccupied', function*() {
      let response = yield request({
        method: 'patch',
        url: getURL('/accounts/' + fixtures.Account[0]._id),
        json: true,
        body: {
          name: 'Bank'
        }
      });
      response.statusCode.should.eql(409);
      response.body.error.should.eql('Account name is occupied');
    });

  });

  describe('DELETE /accounts/:id', () => {

    it('delete account', function*() {
      let response = yield request({
        method: 'delete',
        url: getURL('/accounts/' + fixtures.Account[0]._id),
        json: true,
      });
      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
    });

  });

  describe('DB Validation(POST, PATCH)', () => {

    it('returns 409 if account name already exists', function*() {
      let response = yield request({
        method: 'post',
        url: getURL('/accounts'),
        json: true,
        body: {
          name: 'Bank'
        }
      });
      response.statusCode.should.eql(409);
      response.body.error.should.eql('Account name is occupied');
    });

    it('returns 400 if account name is empty', function*() {
      let response = yield request({
        method: 'post',
        url: getURL('/accounts'),
        json: true,
        body: {
          name: ''
        }
      });
      response.statusCode.should.eql(400);
      response.body.errors[0].should.eql('Account name can\'t be a empty');
    });

  });

});
