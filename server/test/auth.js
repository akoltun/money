'use strict';

const app = require('../app');
const request = require('co-request');
const loadModels = require('../lib/db/loadModels');
const fixtures = require('../fixtures');
request.defaults({
  jar: true
});

let server;

function getURL(path) {
  return `http://localhost:3002${path}`;
}

describe('Auth API', () => {

  before(() => {
    server = app.listen(3002, '127.0.0.1');
  });

  after(() => {
    server.close();
  });

  beforeEach(function*() {
    yield * loadModels(fixtures);
  });

  describe('POST /login', () => {

    afterEach(function*() {
      yield request({
        method: 'get',
        url: getURL('/logout'),
        json: true
      });
    });

    it('returns success and 200', function*() {

      let response = yield request({
        method: 'post',
        url: getURL('/login'),
        json: true,
        body: {
          "email": fixtures.User[0].email,
          "password": fixtures.User[0].password
        }
      });

      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
      response.headers.should.have['set-cookie'];
      response.headers['set-cookie'].length.should.not.eql(0);

    });

    it('returns error and 400 without email', function*() {

      let response = yield request({
        method: 'post',
        url: getURL('/login'),
        json: true,
        body: {
          "password": fixtures.User[0].password
        }
      });

      response.statusCode.should.eql(400);
      response.body.error.should.eql('Email is required');

    });

    it('returns error and 400 without password', function*() {

      let response = yield request({
        method: 'post',
        url: getURL('/login'),
        json: true,
        body: {
          "email": fixtures.User[0].email
        }
      });

      response.statusCode.should.eql(400);
      response.body.should.have.error;
      response.body.error.should.eql('Password is required');

    });

    it('returns error and 401 if email false', function*() {

      let response = yield request({
        method: 'post',
        url: getURL('/login'),
        json: true,
        body: {
          "email": "admin@test.com",
          "password": "123456"
        }
      });

      response.statusCode.should.eql(401);
      response.body.should.have.error;
      console.log(response.body.error);
      response.body.error.should.eql('Email or password wrong');

    });

    it('returns error and 401 if password false', function*() {

      let response = yield request({
        method: 'post',
        url: getURL('/login'),
        json: true,
        body: {
          "email": "admin@test.ru",
          "password": "12345698"
        }
      });

      response.statusCode.should.eql(401);
      response.body.should.have.error;
      response.body.error.should.eql('Email or password wrong');

    });

  });

  describe('GET /logout', () => {

    before(function*() {
      yield request({
        method: 'post',
        url: getURL('/login'),
        json: true,
        body: {
          "email": fixtures.User[0].email,
          "password": fixtures.User[0].password
        }
      });
    });

    it('logout user', function*() {

      let response = yield request({
        method: 'get',
        url: getURL('/logout')
      });

      response.headers.should.not.have['set-cookie'];
      response.statusCode.should.eql(200);

    });

  });

});
