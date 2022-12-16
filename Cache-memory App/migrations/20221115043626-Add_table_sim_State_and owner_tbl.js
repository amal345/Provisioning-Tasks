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
  
    return db.createTable('sim_state', {
     sim_id: { type: 'int', primaryKey: true },
      state: 'string'
    })
    .then(
      function(result) {
        db.createTable('owners_tbl', {
          id: { type: 'int', primaryKey: true },
          name: 'string',
          mail: 'varchar(10)'
        });
      },
      function(err) {
        return;
      }
    );
   
  
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
