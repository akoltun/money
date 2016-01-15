'use strict';

exports.checkStatus = function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if ([400, 401, 409].find(e => e === response.status)) {
    return response;
  }

  let err = new Error(response.statusText);
  err.response = response;
  throw err;
};

exports.parseJSON = function parseJSON(response) {
  return response.json();
};

