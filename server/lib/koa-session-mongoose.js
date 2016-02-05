'use strict';

const mongoose = require('mongoose');

class MongooseStore {
  constructor(options) {

    this.connection = options.connection || mongoose;
    this.expires = options.expires || 60 * 60 * 5; // 5 hours
    this.modelName = options.modelName || 'Session';
    this.Schema = this.connection.Schema || mongoose.Schema;

    this.SessionSchema = this.Schema({
      sid: {
        type: String,
        index: true
      },
      sessionData: Object,
      updatedAt: {
        type: Date,
        default: new Date(),
        expires: this.expires
      }
    });

    this.Session = this.connection.model(this.modelName, this.SessionSchema);

  }

  *get(sid, parse) {

    try {
      let session = yield this.Session.findOne({ sid: sid });

      if (session && session.sid) return session.sessionData;
      else return null;

    } catch(err) {
      console.error(err);
      return null;
    }

  }

  *load(sid) {
    return yield this.get(sid, false);
  }

  *set(sid, sessionData) {

    try {
      yield this.Session.findOneAndUpdate({ sid: sid },
      {sid: sid, sessionData: sessionData, updatedAt: new Date()},
      { upsert: true, safe: true });
    } catch(err) {
      console.error(err);
    }

  }

  *save(sid, sessionData) {
    return yield this.set(sid, sessionData);
  }

  *remove(sid) {

    try {
      yield this.Session.findOneAndRemove({ sid: sid });
    } catch(err) {
      console.error(err);
    }

  }

  *destroy(sid) {
    return yield this.remove(sid);
  }

}

module.exports = MongooseStore;
