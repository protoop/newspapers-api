"use strict";

module.exports = function(app, router){

    // Route :   /newspapers
    // Route :   /newspapers/[newspaper_id]
    // Route :   /newspapers/resolve.json
    // Route :   /themes/[theme_id]/newspapers
    var newspapers = require('./newspapers')(router);

    // Route :   /articles
    // Route :   /articles/limit/[limit]
    // Route :   /articles/offset/[offset]
    // Route :   /articles/limit/[limit]/offset/[offset]
    // Route :   /newspapers/[newspaper_id]/articles
    // Route :   /newspapers/[newspaper_id]/articles/limit/[limit]
    // Route :   /newspapers/[newspaper_id]/articles/offset/[offset]
    // Route :   /newspapers/[newspaper_id]/articles/limit/[limit]/offset/[offset]
    // Route :   /themes/[theme_id]/articles
    // Route :   /themes/[theme_id]/articles/limit/[limit]
    // Route :   /themes/[theme_id]/articles/offset/[offset]
    // Route :   /themes/[theme_id]/articles/limit/[limit]/offset/[offset]
    var articles = require('./articles')(router);

    // Route :   /articles/count
    // Route :   /articles/[article_id]/weekday
    // Route :   /newspapers/[newspaper_id]/articles/count
    var stats = require('./stats')(router);

    // Route :   /articles/[article_id]/timeline
    var timeline = require('./timeline')(router);

    // Route :   /articles/[article_id]/themes
    // Route :   /newspapers/[newspaper_id]/themes
    // Route :   /themes
    // Route :   /themes/[theme_id]
    // Route :   /themes/limit/[limit]
    // Route :   /themes/offset/[offset]
    // Route :   /themes/limit/[limit]/offset/[offset]
    var themes = require('./themes')(router);

    // Route :   /
    router.get('/', function(req, res) {
        res.redirect('/newspapers');
    });
    app.use('/', router);

    // Route :   * (everything that still hasn't been routed yet)
    app.get('*', function(req, res){
        res.status(404).json( {"status": "error"} );
    });

};
