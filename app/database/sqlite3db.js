"use strict";

var fs      = require('fs');
var path    = require('path');
var sqlite3 = require('sqlite3').verbose();
var config  = require('../config');

var db, path_stat, file_stat;

exports.db = function() {
    if (db == null) {
        var file = path.join( path.normalize(config.database.sqlite_3_db_path) , config.database.sqlite_3_db_filename );
        try {
            path_stat = fs.lstatSync(config.database.sqlite_3_db_path);
            file_stat = fs.lstatSync(file);
            if (path_stat.isDirectory()) { /* DB path exists. */ }
            if (file_stat.isDirectory()) { /* DB file exists. */ }
        }
        catch (e) {
            // Display an error and...
            console.log('[ERR] Database file missing ! Based on the configuration file (app/config.js), ' +
                        'the expected file path is : ' + e.path + ')');
            // Quit !
            process.exit(1);
        }
        db = new sqlite3.Database(file);
    }
    return db;
};

exports.select = function() {
    if (!db){
        return [];
    }
    db.all("SELECT * FROM newspaper",function(err,rows){
        // rows = sql result rows ; errors = errors, if any
        if(err){
            return [];
        } else {
            return rows;
        }
    });
};
