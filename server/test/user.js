'use strict';

const app = require('../app');
let originalRequest = require('co-request');
const loadModels = require('../lib/db/loadModels');
const fixtures = require('../fixtures');

let server;

let request = originalRequest.defaults({
  baseUrl: 'http://localhost:3001/',
  jar: true
});

let login = {
  method: 'post',
  url: '/login',
  json: true,
  body: {
    email: fixtures.User[0].email,
    password: fixtures.User[0].password
  }
};
let logout = {method: 'get', url: '/logout'};
let newUserData = {
  email: 'alice@test.ru',
  name: 'alice',
  lastName: 'alice',
  password: '1234567'
};

describe('User REST API', () => {

  before(() => server = app.listen(3001, '127.0.0.1'));
  after(() => server.close());

  beforeEach(function*() {
    yield * loadModels(fixtures);
    yield request(login);
  });

  afterEach(function*() {
    yield request(logout);
  });

  describe('POST /users', () => {

    it('creates a user', function*() {
      let response = yield request({
        method: 'POST',
        url: '/users',
        json: true,
        body: newUserData
      });
      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
      response.body.user.email.should.eql(newUserData.email);
    });

  });

  describe('GET /users/me', () => {

    it('returns a user himself', function*() {

      let response = yield request({
        method: 'get',
        url: '/users/me',
        json: true
      });
      response.statusCode.should.eql(200);
      response.body.email.should.eql(fixtures.User[0].email);
      response.body._id.should.eql(fixtures.User[0]._id);
    });

  });

  describe('PATCH /users/me', () => {

    it('modified a user himself', function*() {
      let response = yield request({
        method: 'patch',
        url: '/users/me',
        json: true,
        body: {
          email: newUserData.email,
          oldPassword: fixtures.User[0].password,
          password: newUserData.password
        }
      });
      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
      response.body.user.email.should.eql(newUserData.email);
    });

    it('returns 409 if email is isOccupied', function*() {
      let response = yield request({
        method: 'patch',
        url: '/users/me',
        json: true,
        body: {
          email: fixtures.User[1].email
        }
      });
      response.statusCode.should.eql(409);
      response.body.error[0].should
        .eql('Error: email: google@google.com exists');
    });

    it('returns 400 if passwordOld is wrong', function*() {
      let response = yield request({
        method: 'patch',
        url: '/users/me',
        json: true,
        body: {
          email: newUserData.email,
          oldPassword: fixtures.User[1].password,
          password: newUserData.password
        }
      });
      response.statusCode.should.eql(400);
      response.body.error.should.eql('Old password is wrong.');
    });

  });

  describe('DELETE /users/me', () => {

    it('delete a user himself', function*() {
      let response = yield request({
        method: 'delete',
        url: '/users/me',
        json: true
      });
      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
    });

  });

  describe('DB Validation(POST, PATCH)', () => {

    it('returns 409 if email already exists', function*() {
      let response = yield request({
        method: 'POST',
        url: '/users',
        json: true,
        body: fixtures.User[0]
      });
      response.statusCode.should.eql(409);
      response.body.error[0].should
        .eql('Error: email: admin@google.com exists');
    });

    it('returns 409 if email not valid', function*() {
      let response = yield request({
        method: 'POST',
        url: '/users',
        json: true,
        body: {
          email: 'dimad@'
        }
      });
      response.statusCode.should.eql(409);
      response.body.error[0].should.eql('Email is wrong');
    });

    it('returns 409 if password less then 4 char', function*() {
      let response = yield request({
        method: 'POST',
        url: '/users',
        json: true,
        body: {
          email: newUserData.email,
          password: '123'
        }
      });
      response.statusCode.should.eql(409);
      response.body.error[0].should
        .eql('Password should not be less than 4 character');
    });

  });

});
