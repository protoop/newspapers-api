"use strict";

var express    = require('express');
var _          = require('lodash');
var morgan     = require('morgan');
var app        = express();
var bodyParser = require('body-parser');
var config     = require('./app/config');
var sqlite     = require('./app/sqlite3db');
var db         = sqlite.db();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/newspapers');
});

router.route('/newspapers')

    .get(function(req, res) {
        db.all("SELECT * FROM newspaper",function(err,rows){
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
        db.all("SELECT * FROM newspaper WHERE id="+req.params.newspaper_id, function(err,rows){
            if(err){
                res.status(500).json( {"status": "error"} );
            } else {
                res.status(200).json( {"status": "ok", "data": rows } );
            }
        });
    });

router.route('/newspapers/:newspaper_id([0-9]+)/articles')

    .get(function(req, res) {
        //TODO : prevent SQL injections
        db.all("SELECT * FROM article WHERE id_newspaper=" + req.params.newspaper_id
                        + " ORDER BY id DESC LIMIT " + config.database.sql_default_limit, function(err,rows){
            if(err){
                res.status(500).json( {"status": "error"} );
            } else {
                res.status(200).json( {"status": "ok", "data": rows } );
            }
        });
    });

router.route('/newspapers/:newspaper_id([0-9]+)/articles/limit/:limit([0-9]+)')

    .get(function(req, res) {
        //TODO : prevent SQL injections
        db.all("SELECT * FROM article WHERE id_newspaper=" + req.params.newspaper_id
                    + " ORDER BY id DESC LIMIT " + req.params.limit, function(err,rows){
            if(err){
                res.status(500).json( {"status": "error"} );
            } else {
                res.status(200).json( {"status": "ok", "data": rows } );
            }
        });
    });

router.route('/newspapers/:newspaper_id([0-9]+)/articles/offset/:offset([0-9]+)')

    .get(function(req, res) {
        //TODO : prevent SQL injections
        db.all("SELECT * FROM article WHERE id_newspaper=" + req.params.newspaper_id
                + " ORDER BY id DESC LIMIT " + config.database.sql_default_limit
                + " OFFSET " + req.params.offset, function(err,rows){
            if(err){
                res.status(500).json( {"status": "error"} );
            } else {
                res.status(200).json( {"status": "ok", "data": rows } );
            }
        });
    });

router.route('/newspapers/:newspaper_id([0-9]+)/articles/count')

    .get(function(req, res) {
        //TODO : prevent SQL injections
        db.all("SELECT COUNT(*) FROM article WHERE id_newspaper=" + req.params.newspaper_id, function(err,rows){
            if(err){
                res.status(500).json( {"status": "error"} );
            } else {
                res.status(200).json( {"status": "ok", "data":  rows[0]["COUNT(*)"]} );
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
            unsafe_url = unsafe_url.replace("https://","").replace("http://","").replace(/\/$/, "")
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


app.use('/', router);

app.get('*', function(req, res){
    res.status(404).json( {"status": "error"} );
});

app.listen(config.web.port);

console.log("Server running at http://127.0.0.1:" + config.web.port + "/");
