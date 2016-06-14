var path = require('path');
var fs = require('fs');

module.exports = function (session) {

  var Store = session.Store;

  function MyStore (dir) {
    this._data = {};
  }

  MyStore.prototype.__proto__ = Store.prototype;

  MyStore.prototype.get = function (sid, callback) {
    console.log('get: sid=%s', sid);
    callback(null, this._data[sid]);
  };

  MyStore.prototype.set = function (sid, session, callback) {
    console.log('set: sid=%s, session=%j', sid, session);
    this._data[sid] = session;
    callback();
  };

  MyStore.prototype.destroy = function (sid, callback) {
    console.log('destroy: sid=%s', sid);
    delete this._data[sid];
    callback();
  };

  return MyStore;

};
