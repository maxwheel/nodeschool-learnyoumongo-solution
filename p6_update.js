var mongo = require('mongodb').MongoClient,
    q = require('q'),
    _ = require('lodash');

var url = 'mongodb://localhost:27017/' + process.argv[2];
var collectionName = 'users';
var cond = {username:'tinatime'};
var upd = {$set:{age: 40}};

q.nfcall(mongo.connect, url)
    .then(function(db){
            var collection = db.collection(collectionName);
            collection.updateOne(cond, upd, function(err, doc){
                if (err) throw err;
                //console.log(doc);
                db.close();
            });
        })
.catch(function(err){
        console.error(err);
        });
            

