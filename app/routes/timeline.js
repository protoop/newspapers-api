"use strict";

var sqlite     = require('../database/sqlite3db');
var db         = sqlite.db();

module.exports = function(router) {

    router.route('/articles/:article_id([0-9]+)/timeline')

        .get(function(req, res) {
            //TODO : prevent SQL injections
            var sql = "SELECT *"
                + " FROM timeline_point"
                + " WHERE id_article=" + req.params.article_id;
            db.all(sql, function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

};
