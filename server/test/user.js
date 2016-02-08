'use strict';

const app = require('../app');
const request = require('co-request');
const loadModels = require('../lib/db/loadModels');
const fixtures = require('../fixtures');
let server;

function getURL(path) {
  return `http://localhost:3001${path}`;
}

describe('User REST API', () => {

  before(() => {
    server = app.listen(3001, '127.0.0.1');
  });

  after(() => {
    server.close();
  });

  beforeEach(function*() {
    yield * loadModels(fixtures);
  });

  let newUserData = {
    email: "alice@test.ru",
    name: 'alice',
    lastName: 'alice',
    password: '1234567'
  };

  describe('POST /users', () => {

    it("creates a user", function*() {
      let response = yield request({
        method: 'POST',
        url: getURL('/users'),
        json: true,
        body: newUserData
      });
      response.statusCode.should.eql(302);
      response.body.should.eql('Redirecting to /.');
    });

  });

  describe('GET /users/me', () => {

    let req;

    beforeEach(function*() {
      req = request.defaults({
        jar: true
      });
      yield req({
        method: 'post',
        url: getURL('/login'),
        json: true,
        body: {
          "email": fixtures.User[0].email,
          "password": fixtures.User[0].password
        }
      });
    });

    afterEach(function*() {
      yield req({
        method: 'get',
        url: getURL('/logout')
      });
    });

    it('returns a user himself', function*() {

      let response = yield req({
        method: 'get',
        url: getURL('/users/me'),
        json: true
      });
      response.statusCode.should.eql(200);
      response.body.email.should.eql(fixtures.User[0].email);
      response.body.id.should.eql(fixtures.User[0]._id);
    });

  });

  describe('PATCH /users/me', () => {

    let req;

    beforeEach(function*() {
      req = request.defaults({
        jar: true
      });
      yield req({
        method: 'post',
        url: getURL('/login'),
        json: true,
        body: {
          "email": fixtures.User[0].email,
          "password": fixtures.User[0].password
        }
      });
    });

    afterEach(function*() {
      yield req({
        method: 'get',
        url: getURL('/logout')
      });
    });

    it('modified a user himself', function*() {
      let response = yield req({
        method: 'patch',
        url: getURL('/users/me'),
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
      let response = yield req({
        method: 'patch',
        url: getURL('/users/me'),
        json: true,
        body: {
          email: fixtures.User[1].email
        }
      });
      response.statusCode.should.eql(409);
      response.body.error.should.eql('Email is occupied.');
    });

    it('returns 400 if passwordOld is wrong', function*() {
      let response = yield req({
        method: 'patch',
        url: getURL('/users/me'),
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

    let req;

    beforeEach(function*() {
      req = request.defaults({
        jar: true
      });
      yield req({
        method: 'post',
        url: getURL('/login'),
        json: true,
        body: {
          "email": fixtures.User[0].email,
          "password": fixtures.User[0].password
        }
      });
    });

    afterEach(function*() {
      yield req({
        method: 'get',
        url: getURL('/logout')
      });
    });

    it('delete a user himself', function*() {
      let response = yield req({
        method: 'delete',
        url: getURL('/users/me'),
        json: true
      });
      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
    });

  });

  describe('DB Validation(POST, PATCH)', () => {

    it('returns 400 if email already exists', function*() {
      let response = yield request({
        method: 'POST',
        url: getURL('/users'),
        json: true,
        body: fixtures.User[0]
      });
      response.statusCode.should.eql(400);
      response.body.errors[0].should.eql('Error: email: admin@google.com exists');
    });

    it('returns 400 if email not valid', function*() {
      let response = yield request({
        method: 'POST',
        url: getURL('/users'),
        json: true,
        body: {
          email: 'dimad@'
        }
      });
      response.statusCode.should.eql(400);
      response.body.errors[0].should.eql('Email is wrong');
    });

    it('returns 400 if password less then 4 char', function*() {
      let response = yield request({
        method: 'POST',
        url: getURL('/users'),
        json: true,
        body: {
          email: newUserData.email,
          password: '123'
        }
      });
      response.statusCode.should.eql(400);
      response.body.errors[0].should.eql('Password should not be less than 4 character');
    });

  });

});
