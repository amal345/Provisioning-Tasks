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
//  db.runSql(
//   "CREATE INDEX Sim_Number ON sim_directory (sim_number);"
//   )
return db.addIndex("sim_directory", "Sim_Number","sim_number")
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
