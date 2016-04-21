'use strict';

const mongoose = require('./mongoose');
const oid = require('./oid');
const loadModels = require('./loadModels');

module.exports = {
  mongoose: mongoose,
  oid: oid,
  loadModels: loadModels
};
