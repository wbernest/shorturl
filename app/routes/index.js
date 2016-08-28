'use strict';
var validUrl = require("valid-url");
var SiteHandler = require(process.cwd() + "/app/controllers/addSiteHandler.server.js");

module.exports = function (app, db) {
    
    var siteHandler = new SiteHandler(db);
    
    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html'); });
    
    app.route('/:url')
        .get(function(req, res) {
            siteHandler.goToSite(res, req.params.url);
        });
        
    app.route('/new/:url')
        .get(function (req, res){
            res.send({"error": "Wrong url format, make sure you have a valid protocol and a real site."});
        });
    
    app.route('/new/http://:url')
        .get(function (req, res){
            if(!validUrl.isUri("http://" + req.params.url))
                res.send({"error": "Wrong url format, make sure you have a valid protocol and a real site."});
                
            siteHandler.addSite(res, "http://" + req.params.url);
        });

    app.route('/new/https://:url')
        .get(function (req, res){
            if(!validUrl.isUri("https://" + req.params.url))
                res.send({"error": "Wrong url format, make sure you have a valid protocol and a real site."});
            siteHandler.addSite(res, "https://" + req.params.url);
        });

};