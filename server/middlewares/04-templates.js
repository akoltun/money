'use strict';

const jade = require('jade');
const config = require('config');
const path = require('path');

module.exports = function*(next) {

  let ctx = this;

  /* default helpers */
  this.state = {
    /* at the time of this middleware, user is unknown, so we make it a getter */
    get user() {
      return ctx.req.user; // passport sets this
    }
  };

  this.render = function(templatePath, locals) {
    locals = locals || {};

    let localsFull = Object.create(this.state);

    for (let key in locals) {
      localsFull[key] = locals[key];
    }

    let templatePathResolved = path.join(config.server.templates, templatePath + '.jade');

    return jade.renderFile(templatePathResolved, localsFull);
  };

  yield * next;

};
