var mongo = require('mongodb').MongoClient,
    q = require('q'),
    _ = require('lodash');

var url = 'mongodb://localhost:27017/learnyoumongo';
var cond = {age:{$gt: _.parseInt(process.argv[2],10)}};
var collectionName = 'parrots';

var toArray = function(cursor){
        var def = q.defer();
        cursor.toArray(function(err, doc){
                if (err) return def.reject(err);
                if (doc) return def.resolve(doc);
                else return def.reject('no doc');
                });
        return def.promise;
};

q.nfcall(mongo.connect, url)
    .then(function(db){
            db.collection(collectionName)
            .count(cond, function(err, count){
                console.log(count);
                db.close();
                })
            })
.catch(function(err){console.error(err)});
            

