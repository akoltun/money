'use strict';
const path = require('path');
const ROOT = `${__dirname}/..`;

module.exports = {

  server: {
    port: 3000,
    host: '127.0.0.1',
    root: path.normalize(ROOT + '/server'),
    public: path.normalize(ROOT + '/public'),
    templates: path.normalize(ROOT + '/server/templates'),
    fixtures: path.normalize(ROOT + '/server/fixtures')
  },

  client: {
    root: path.normalize(ROOT + '/client'),
    assets: path.normalize(ROOT + '/public/assets')
  },

  mongoose: {
    url: 'mongodb://localhost/money',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      }
    }
  },

  session: {
    key: 'sid',
    prefix: 'sess:',
    rolling: true,
    cookie: {
      httpOnly: true,
      path: '/',
      overwrite: true,
      maxAge: 3600 * 5 * 1000 //ms
    }
  },

  secret: 'moneysecret',

  crypto: {
    hash: {
      length: 128,
      iterations: process.env.NODE_ENV == 'production' ? 12000 : 1
    }
  }

};
