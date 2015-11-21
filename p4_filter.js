var mongo = require('mongodb').MongoClient,
    q = require('q'),
    _ = require('lodash');

var url = 'mongodb://localhost:27017/learnyoumongo';
var cond = {age:{$gt: _.parseInt(process.argv[2],10)}};
var left = {name:1, age:1, _id:0};
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
            var cursor = db.collection(collectionName).find(cond, left);
            //var toArray = q.nbind(cursor.toArray);
            toArray(cursor).then(function(doc){
                console.log(doc);
                })
            .catch(function(err){console.error(err)})
            .finally(function(){db.close();});


//            cursor.toArray(function(err, doc){
//                if (err) return console.log(err);
//                if (doc) console.log(doc);
//                db.close();
//                })
            })
.catch(function(err){console.error(err)});
            

