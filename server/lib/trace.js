'use strict';
Error.stackTraceLimit = 1000;
require('trace');
require('clarify');

let chain = require('stack-chain');

chain.filter.attach((error, frames) => {
  return frames.filter((callSite) => {
    let name = callSite && callSite.getFileName();
    return (name && name.indexOf('/co/') == -1);
  });
});
