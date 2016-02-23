'use strict';

const mongoose = require('../mongoose');
// mongoose.set('debug', true);

module.exports = function*(data) {
  let modelsData = (typeof data === 'string') ? require(data) : data;

  for (let modelName in modelsData) {
    let Model = mongoose.models[modelName];
    yield Model.remove({});
    yield* loadModel(Model, modelsData[modelName]);
  }

};

function* loadModel(Model, data) {
  for (let i = 0; i < data.length; i++) {
    yield Model.create(data[i]);
  }
}