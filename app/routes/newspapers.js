"use strict";

var sqlite     = require('../database/sqlite3db');
var db         = sqlite.db();

module.exports = function(router) {

    router.route('/newspapers')

        .get(function(req, res) {
            var sql = "SELECT newspaper.*, count(article.id) as nb FROM newspaper " +
                "INNER JOIN article " +
                "ON newspaper.id = article.id_newspaper " +
                "GROUP BY newspaper.id";
            db.all(sql,function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    // Hide the id ? This way :
                    //res.status(200).json( {"status": "ok", "data": _.map(rows, function(obj){ return _.omit(obj, 'id')})  } );
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

    router.route('/newspapers/:newspaper_id([0-9]+)')

        .get(function(req, res) {
            //TODO : prevent SQL injections
            var sql = "SELECT  newspaper.*, count(article.id) as nb FROM newspaper " +
                "INNER JOIN article " +
                "ON newspaper.id = article.id_newspaper " +
                "WHERE newspaper.id=" + req.params.newspaper_id;
            db.all(sql, function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

    router.route('/themes/:theme_id([0-9]+)/newspapers')

        .get(function(req, res) {
            //TODO : prevent SQL injections
            var sql = "SELECT newspaper.*, count(*) as themeOccurences"
                + " FROM theme_article_jointure"
                + " INNER JOIN theme"
                + " ON theme_article_jointure.id_theme = theme.id"
                + " INNER JOIN article"
                + " ON article.id = theme_article_jointure.id_article"
                + " INNER JOIN newspaper"
                + " ON newspaper.id = article.id_newspaper"
                + " WHERE theme_article_jointure.id_theme = " + req.params.theme_id
                + " GROUP BY newspaper.id"
                + " ORDER BY themeOccurences DESC";
            db.all(sql, function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

    router.route('/newspapers/resolve.json')

        .get(function(req, res) {
            //TODO : prevent SQL injections !!!
            var unsafe_url = req.query.url;
            if (!unsafe_url){
                res.status(404).json( {"status": "error", message:"Missing url parameter : /?url=www.fqdn..."} )
            } else {
                // Clean url :
                unsafe_url = unsafe_url.replace("https://","").replace("http://","").replace(/\/$/, "");
                // Prevent SQL injection
                // Search in database
                db.all("SELECT id FROM newspaper WHERE url=\"" + "http://" + unsafe_url + "\";", function(err,rows){
                    if(rows){
                        if(rows.length) {
                            res.redirect('/newspapers/' + rows[0].id);
                        } else {
                            //Try again, with www. :
                            db.all("SELECT id FROM newspaper WHERE url=\"" + "http://www." + unsafe_url + "\";", function(err,rows){
                                if(rows){
                                    if(rows.length) {
                                        res.redirect('/newspapers/' + rows[0].id);
                                    } else {
                                        res.status(404).json( {"status": "error", message:"Nothing found."} )
                                    }
                                }
                                if(err){
                                    res.status(500).json( {"status": "error"} )
                                }
                            });
                        }
                    }
                    if(err){
                        res.status(500).json( {"status": "error"} )
                    }
                });
            }
        });

};
