'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable("sim_directory", {
    id:{type: 'serial', primaryKey: true},
    sim_number: {type: 'text'},
    state:{type: ' text'},
    owner: { type: 'text'}
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};