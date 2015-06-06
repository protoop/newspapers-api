"use strict";

var config     = require('../config');
var sqlite     = require('../database/sqlite3db');
var db         = sqlite.db();

module.exports = function(router) {

    // A specific article's theme ---------------------------------------------
    router.route('/articles/:article_id([0-9]+)/themes')

        .get(function(req, res) {
            var sql = "SELECT theme.*"
                + " FROM theme_article_jointure"
                + " INNER JOIN theme"
                + " ON theme_article_jointure.id_theme = theme.id"
                + " WHERE theme_article_jointure.id_article = " + req.params.article_id
                + " LIMIT " + config.database.sql_default_limit;
            //TODO : prevent SQL injections
            db.all(sql, function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

    // All themes ---------------------------------------------------------
    router.route('/themes')

        .get(function(req, res) {
            var sql = "select theme.id, theme.name, count(theme_article_jointure.id_theme) as nb"
            + " FROM theme"
            + " INNER JOIN theme_article_jointure"
            + " ON theme.id = theme_article_jointure.id_theme"
            + " WHERE theme.name != ''"
            + " GROUP BY theme.id"
            + " ORDER BY nb DESC"
            + " LIMIT " + config.database.sql_default_themes_limit;
            //TODO : prevent SQL injections
            db.all(sql, function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

    router.route('/themes/:theme_id([0-9]+)')

        .get(function(req, res) {
            //TODO : prevent SQL injections
            var sql = "SELECT theme.*, count(*) as nb"
                + " FROM theme_article_jointure"
                + " INNER JOIN theme"
                + " ON theme_article_jointure.id_theme = theme.id"
                + " WHERE theme_article_jointure.id_theme = " + req.params.theme_id;
            db.all(sql, function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

    router.route('/themes/limit/:limit([0-9]+)')

        .get(function(req, res) {
            var sql = "select theme.id, theme.name, count(theme_article_jointure.id_theme) as nb"
                + " FROM theme"
                + " INNER JOIN theme_article_jointure"
                + " ON theme.id = theme_article_jointure.id_theme"
                + " WHERE theme.name != ''"
                + " GROUP BY theme.id"
                + " ORDER BY nb DESC"
                + " LIMIT " + req.params.limit;
            //TODO : prevent SQL injections
            db.all(sql, function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

    router.route('/themes/offset/:offset([0-9]+)')

        .get(function(req, res) {
            var sql = "select theme.id, theme.name, count(theme_article_jointure.id_theme) as nb"
                + " FROM theme"
                + " INNER JOIN theme_article_jointure"
                + " ON theme.id = theme_article_jointure.id_theme"
                + " WHERE theme.name != ''"
                + " GROUP BY theme.id"
                + " ORDER BY nb DESC"
                + " LIMIT " + config.database.sql_default_themes_limit
                + " OFFSET " + req.params.offset;
            //TODO : prevent SQL injections
            db.all(sql, function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

    router.route('/themes/limit/:limit([0-9]+)/offset/:offset([0-9]+)')

        .get(function(req, res) {
            var sql = "select theme.id, theme.name, count(theme_article_jointure.id_theme) as nb"
                + " FROM theme"
                + " INNER JOIN theme_article_jointure"
                + " ON theme.id = theme_article_jointure.id_theme"
                + " WHERE theme.name != ''"
                + " GROUP BY theme.id"
                + " ORDER BY nb DESC"
                + " LIMIT " + req.params.limit
                + " OFFSET " + req.params.offset;
            //TODO : prevent SQL injections
            db.all(sql, function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

    // A specific newspaper's theme ---------------------------------------------
    router.route('/newspapers/:newspaper_id([0-9]+)/themes')

        .get(function(req, res) {
            var sql = "SELECT theme.*, COUNT(*) as newspaperOccurences"
                + " FROM newspaper"
                + " INNER JOIN article"
                + " ON article.id_newspaper = newspaper.id"
                + " INNER JOIN theme_article_jointure"
                + " ON theme_article_jointure.id_article = article.id"
                + " INNER JOIN theme"
                + " ON theme.id = theme_article_jointure.id_theme"
                + " WHERE newspaper.id = " + req.params.newspaper_id
                + " GROUP BY theme.id"
                + " ORDER BY newspaperOccurences DESC"
                + " LIMIT " + config.database.sql_default_themes_limit;
            //TODO : prevent SQL injections
            db.all(sql, function(err,rows){
                if(err){
                    res.status(500).json( {"status": "error"} );
                } else {
                    res.status(200).json( {"status": "ok", "data": rows } );
                }
            });
        });

};
