"use strict";

var express    = require('express');
var morgan     = require('morgan');
var app        = express();
var bodyParser = require('body-parser');
var config     = require('./app/config');

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
var routes = require('./app/routes/index')(app, router);

app.listen(config.web.port);

console.log("Server running at http://127.0.0.1:" + config.web.port + "/");
