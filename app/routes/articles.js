"use strict";

var config     = require('../config');
var sqlite     = require('../database/sqlite3db');
var db         = sqlite.db();

module.exports = function(router) {

    // All newspapers ---------------------------------------------------------
    router.route('/articles')

        .get(function(req, res) {
            var sql = "SELECT * FROM article"
                + " ORDER BY id DESC"
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

    router.route('/articles/limit/:limit([0-9]+)')

        .get(function(req, res) {
            var sql = "SELECT * FROM article"
                + " ORDER BY id DESC"
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

    router.route('/articles/offset/:offset([0-9]+)')

        .get(function(req, res) {
            var sql = "SELECT * FROM article"
                + " ORDER BY id DESC"
                + " LIMIT " + config.database.sql_default_limit
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

    router.route('/articles/limit/:limit([0-9]+)/offset/:offset([0-9]+)')

        .get(function(req, res) {
            var sql = "SELECT * FROM article"
                + " ORDER BY id DESC"
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

    // A specific newspaper ---------------------------------------------------
    router.route('/newspapers/:newspaper_id([0-9]+)/articles')

        .get(function(req, res) {
            var sql = "SELECT * FROM article"
                + " WHERE id_newspaper=" + req.params.newspaper_id
                + " ORDER BY id DESC"
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

    router.route('/newspapers/:newspaper_id([0-9]+)/articles/limit/:limit([0-9]+)')

        .get(function(req, res) {
            var sql = "SELECT * FROM article"
                + " WHERE id_newspaper=" + req.params.newspaper_id
                + " ORDER BY id DESC"
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

    router.route('/newspapers/:newspaper_id([0-9]+)/articles/offset/:offset([0-9]+)')

        .get(function(req, res) {
            var sql = "SELECT * FROM article"
                + " WHERE id_newspaper=" + req.params.newspaper_id
                + " ORDER BY id DESC"
                + " LIMIT " + config.database.sql_default_limit
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

    router.route('/newspapers/:newspaper_id([0-9]+)/articles/limit/:limit([0-9]+)/offset/:offset([0-9]+)')

        .get(function(req, res) {
            var sql = "SELECT * FROM article"
                + " WHERE id_newspaper=" + req.params.newspaper_id
                + " ORDER BY id DESC"
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

    // A specific theme's articles --------------------------------------------
    router.route('/themes/:theme_id([0-9]+)/articles')

        .get(function(req, res) {
            var sql = "SELECT article.*"
                + " FROM theme_article_jointure"
                + " INNER JOIN article"
                + " ON theme_article_jointure.id_article = article.id"
                + " WHERE theme_article_jointure.id_theme = " + req.params.theme_id
                + " ORDER BY article.id DESC"
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

    router.route('/themes/:theme_id([0-9]+)/articles/limit/:limit([0-9]+)')

        .get(function(req, res) {
            var sql = "SELECT article.*"
                + " FROM theme_article_jointure"
                + " INNER JOIN article"
                + " ON theme_article_jointure.id_article = article.id"
                + " WHERE theme_article_jointure.id_theme = " + req.params.theme_id
                + " ORDER BY article.id DESC"
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

    router.route('/themes/:theme_id([0-9]+)/articles/offset/:offset([0-9]+)')

        .get(function(req, res) {
            var sql = "SELECT article.*"
                + " FROM theme_article_jointure"
                + " INNER JOIN article"
                + " ON theme_article_jointure.id_article = article.id"
                + " WHERE theme_article_jointure.id_theme = " + req.params.theme_id
                + " ORDER BY article.id DESC"
                + " LIMIT " + config.database.sql_default_limit
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

    router.route('/themes/:theme_id([0-9]+)/articles/limit/:limit([0-9]+)/offset/:offset([0-9]+)')

        .get(function(req, res) {
            var sql = "SELECT article.*"
                + " FROM theme_article_jointure"
                + " INNER JOIN article"
                + " ON theme_article_jointure.id_article = article.id"
                + " WHERE theme_article_jointure.id_theme = " + req.params.theme_id
                + " ORDER BY article.id DESC"
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

};
