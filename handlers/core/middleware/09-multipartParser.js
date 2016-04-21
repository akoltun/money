'use strict';
// recieve multipart/form
// without files

// for routes which require custom file handling
// can introduce config to ignore them here

const busboy = require('co-busboy');


module.exports = function*(next) {
  // the body isn't multipart, so busboy can't parse it
  if (!this.request.is('multipart/*')) return yield* next;

  let parser = busboy(this, {
    autoFields: true
  });

  let part = yield parser;
  
  while (part) {
    part = yield parser;
    // autoFields => part is a file
    // specific handlers know how to handle the file, not us
    // alt: can auto-save to disk
    this.throw(400, 'Files are not allowed here');
  }

  this.request.body = parser.field;

  // parser.fields.forEach((field) => {
  //     this.request.body[field[0]] = field[1];
  // });

  yield* next;
};
