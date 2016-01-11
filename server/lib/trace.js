'use strict';
Error.stackTraceLimit = 1000;
require('trace');
require('clarify');

let chain = require('stack-chain');

chain.filter.attach(function (error, frames) {
  return frames.filter(function (callSite) {
    let name = callSite && callSite.getFileName();
    return (name && name.indexOf("/co/") == -1);
  });
});
