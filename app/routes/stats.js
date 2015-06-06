"use strict";

var sqlite     = require('../database/sqlite3db');
var db         = sqlite.db();

module.exports = function(router) {

    router.route('/articles/count')

        .get(function (req, res) {
            //TODO : prevent SQL injections
            db.all("SELECT COUNT(*) FROM article", function (err, rows) {
                if (err) {
                    res.status(500).json({"status": "error"});
                } else {
                    res.status(200).json({"status": "ok", "data": rows[0]["COUNT(*)"]});
                }
            });
        });

    router.route('/articles/:article_id([0-9]+)/weekday')

        .get(function (req, res) {
            var sql = "SELECT time"
                + " FROM timeline_point"
                + " WHERE point_type='creation_time' AND id_article=" + req.params.article_id;
            //TODO : prevent SQL injections
            db.all(sql, function (err, rows) {
                if (err) {
                    res.status(500).json({"status": "error"});
                } else {
                    try {
                        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        var day = new Date(rows[0]["time"]).getDay();
                        res.status(200).json({"status": "ok","data": days[day]});
                    } catch (err2) {
                        res.status(500).json({"status": "error"});
                    }
                }
            });
        });

    router.route('/newspapers/:newspaper_id([0-9]+)/articles/count')

        .get(function (req, res) {
            //TODO : prevent SQL injections
            db.all("SELECT COUNT(*) FROM article WHERE id_newspaper=" + req.params.newspaper_id, function (err, rows) {
                if (err) {
                    res.status(500).json({"status": "error"});
                } else {
                    res.status(200).json({"status": "ok", "data": rows[0]["COUNT(*)"]});
                }
            });
        });

};
