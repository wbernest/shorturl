'use strict';

function addSiteHandler (db) {

    var sites = db.collection('sites');

    this.addSite = function (res, url) {
        
        db.collection('sites').find().toArray(function(err, docs){
          if(err) throw err;
          
          if(docs.length === 0){
              db.collection('sites').insert({'_id': 0,'short_url': 'https://urlshortener-basejump-wbernest.c9users.io/0', 'original_url': url}, function(err, data){
                if(err) throw err;
                //db.close();
                console.log(data.ops[0]);
                res.send(data.ops[0]);
              });
          }
          else if(docs.map(function(a){return a.original_url}).indexOf(url) == -1)
          {
              db.collection('sites').insert({'_id': docs[docs.length-1]._id + 1,'short_url': 'https://urlshortener-basejump-wbernest.c9users.io/' + (parseInt(docs[docs.length-1]._id) + 1), 'original_url': url}, function(err, data){
                if(err) throw err;
                //db.close();
                console.log(data.ops[0]);
                res.send(data.ops[0]);
              });
          }
          else{
            //db.close();
            console.log(docs[docs.map(function(a){return a.original_url}).indexOf(url)]);
            res.send(docs[docs.map(function(a){return a.original_url}).indexOf(url)]);
          }
        });
    };
    
    this.goToSite = function(res, short_url){
      db.collection('sites').find({"short_url": "https://urlshortener-basejump-wbernest.c9users.io/" + short_url}).toArray(function(err, docs){
        if(err) throw err;
        if(docs.length === 0){
          //db.close();
          res.send({"error" : "This url is not in the database."});
        }        
        else{
          //db.close();
          res.redirect(docs[0].original_url);
        }
      });
    };
    

}

module.exports = addSiteHandler;