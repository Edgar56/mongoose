var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', function (err, db) {
    if (err) throw err

    console.log('Connected');

    // db.collection('mammals').find().toArray(function (err, result) {
    //     if (err) throw err
    //
    //     console.log(result)
    // })
});