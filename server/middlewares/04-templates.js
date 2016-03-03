'use strict';

const jade = require('jade');
const path = require('path');
const fs = require('mz/fs');
const templatesPath = require('config').server.templates;

let assetsPath = require('config').client.assets;
assetsPath = path.join(assetsPath, './assets.json');

const moment = require('moment');

module.exports = function*(next) {

  let ctx = this;
  let assets = yield fs.readFile(assetsPath, {encoding: 'utf-8'});
  assets = JSON.parse(assets);

  this.state = {
    assets: assets,
    // at the time of this middleware, user is unknown, so we make it a getter
    get user() {
      return ctx.req.user; // passport sets this
    },
    get moment() {
      return moment;
    },
    get flash() {
      return ctx.flash;
    },
    get NODE_ENV() {
      return ctx.app.env;
    }
  };

  this.render = function(templatePath, locals) {
    locals = locals || {};

    let localsFull = Object.create(this.state);

    Object.keys(locals).forEach((prop) => {
      localsFull[prop] = locals[prop];
    });

    let templatePathResolved = path.join(templatesPath, templatePath + '.jade');

    return jade.renderFile(templatePathResolved, localsFull);
  };

  yield * next;

};
