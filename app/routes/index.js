'use strict';
var url = require("url");
var strftime = require("strftime");

module.exports = function (app) {
    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html'); });
            
    app.route('/:date/')
        .get(function(req, res){
            var unixTime = null;
            var standardTime = null;
            
            if(!isNaN(req.params.date))
            {
                standardTime = strftime('%B %d, %Y', new Date(req.params.date * 1000));
                unixTime = parseInt(req.params.date);
                
            }
            else if(!isNaN(Date.parse(req.params.date.replace("%20", " "))))
            {
                unixTime = Date.parse(req.params.date.replace("%20", " "))/1000;
                standardTime = req.params.date;
            }
            
            res.send({"unix": unixTime, "natural": standardTime}); 
        });
};