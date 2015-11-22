var mongo = require('mongodb').MongoClient,
    q = require('q'),
    _ = require('lodash');

var url = 'mongodb://localhost:27017/learnyoumongo';
var collectionName = "prices";
var match = {$match: {size: process.argv[2]}};
var group = {$group:{_id: "$_id", avg:{$sum: "$price"}}};
console.log(JSON.stringify([match, group]));

q.nfcall(mongo.connect, url)
    .then(function(db){
            db.collection(collectionName).find(match.$match)
            .toArray(function(err, result){
                console.log("all:");
                console.log(result);
                });

            console.log('in db');
            db.collection(collectionName).aggregate([match, group])
            .toArray(function(err, result){
                if (err) throw err;
                console.log(result.avg);
                db.close();
                });
            })
.catch(function(err){console.error(err);});

