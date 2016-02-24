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
  return `http://localhost:3004${path}`;
}

describe('Category REST API', () => {

  before(() => {
    server = app.listen(3004, '127.0.0.1');
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

  let newCategoryData = {
    name: 'newCategory'
  };

  describe('PARAMS', () => {

    it('returns 404 if category not exist', function*() {
      let response = yield request({
        method: 'get',
        url: getURL('/categories/fe3a2ecc7355a20674486789'),
        json: true
      });
      response.statusCode.should.eql(404);
      response.body.error.should.eql('Category not found');
    });

    it('returns 403 if user not authorized', function*() {
      yield request({
        method: 'get',
        url: getURL('/logout'),
        json: true
      });

      let response = yield request({
        method: 'get',
        url: getURL('/categories/' + fixtures.Category[0]._id),
        json: true
      });
      response.statusCode.should.eql(403);
      response.body.error.should.eql('Forbidden, authorization required');
    });

  });

  describe('POST /categories', () => {

    it('creates category', function*() {
      let response = yield request({
        method: 'post',
        url: getURL('/categories'),
        json: true,
        body: newCategoryData
      });
      response.statusCode.should.eql(201);
      response.body.success.should.eql(true);
      response.body.category.name.should.eql(newCategoryData.name);
      response.body.category.user._id.should.eql(fixtures.User[0]._id);
    });

  });

  describe('GET /categories', () => {

    it('returns categories to user', function*() {
      let response = yield request({
        method: 'get',
        url: getURL('/categories'),
        json: true
      });
      response.statusCode.should.eql(200);
      response.body.length.should.eql(3);
    });

  });

  describe('GET /categories/:id', () => {

    it('returns transactions by category to user', function*() {
      let response = yield request({
        method: 'get',
        url: getURL('/categories/' + fixtures.Category[0]._id),
        json: true
      });
      response.statusCode.should.eql(200);
      response.body.length.should.eql(2);
      response.body[0].categories[0].should.eql(fixtures.Category[0]._id);
      response.body[1].categories[0].should.eql(fixtures.Category[0]._id);
    });

  });

  describe('PATCH /categories/:id', () => {

    it('modified category', function*() {
      let response = yield request({
        method: 'patch',
        url: getURL('/categories/' + fixtures.Category[0]._id),
        json: true,
        body: newCategoryData
      });
      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
      response.body.category.user.should.eql(fixtures.User[0]._id);
    });

    it('returns 409 if category name is isOccupied', function*() {
      let response = yield request({
        method: 'patch',
        url: getURL('/categories/' + fixtures.Category[0]._id),
        json: true,
        body: {
          name: 'travel'
        }
      });
      response.statusCode.should.eql(409);
      response.body.error.should.eql('Category name is occupied');
    });

  });

  describe('DELETE /categories/:id', () => {

    it('delete category', function*() {
      let response = yield request({
        method: 'delete',
        url: getURL('/categories/' + fixtures.Category[0]._id),
        json: true,
      });
      response.statusCode.should.eql(200);
      response.body.success.should.eql(true);
    });

  });

  describe('DB Validation(POST, PATCH)', () => {

    it('returns 409 if category name already exists', function*() {
      let response = yield request({
        method: 'post',
        url: getURL('/categories'),
        json: true,
        body: {
          name: 'travel'
        }
      });
      response.statusCode.should.eql(409);
      response.body.error.should.eql('Category name is occupied');
    });

    it('returns 409 if category name is empty', function*() {
      let response = yield request({
        method: 'post',
        url: getURL('/categories'),
        json: true,
        body: {
          name: ''
        }
      });
      response.statusCode.should.eql(409);
      response.body.errors[0].should.eql('Category name can\'t be a empty');
    });

  });

});
