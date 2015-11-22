var mongo = require('mongodb').MongoClient,
    q = require('q'),
    _ = require('lodash');

var url = 'mongodb://localhost:27017/learnyoumongo';
var collectionName = 'docs';
var data = {firstName: process.argv[2], lastName: process.argv[3]};
//data = {firstName: 'aa', lastName: 'last'};
console.log(JSON.stringify(data));

q.nfcall(mongo.connect, url)
    .then(function(db){
            //console.log("get db");
            db.collection(collectionName)
            .insertOne(data, function(err, res){
                if (err) throw err;
                //console.log(res);
                db.close();
                });
            })
.catch(function(err){
        console.error(err);
        });
            

