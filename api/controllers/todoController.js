'use strict'
var mongo = require('mongodb');
var file = require('../../data.json');
const fs = require('fs');
var MongoClient = mongo.MongoClient;
var url = process.env.MONGODB_URL || "mongodb://localhost:27017/";
const client = new MongoClient(url, { useNewUrlParser: true });

exports.write_all_data = function (req, res) {
    var json = file;
    // client.connect(function (err) {
    //     if (err) throw err;
    //     var dbo = client.db("mydb");
    //     dbo.collection("chords").find({}, { projection: { _id: 0, name: 1, artis: 2, album: 3, type: 4, link: 5 } }).toArray(function (err, result) {
    //         if (err) throw err;
    //         result.forEach(function (result) {
    //             json['Sheet1'].push(result);
    //         });
    //         res.json(json);
    //         client.close();
    //     });
    // });
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
      });
};

exports.add_a_thing = function (req, res) {
    console.log(req.params);
    console.log(req.query);
    var mName = req.query.name;
    var mArtis = req.query.artis;
    var mAlbum = req.query.album;
    var mType = req.query.type;
    var mLink = req.query.link;
    var mPassword = req.query.password;

    var chordObject = { name: mName, artis: mArtis, album: mAlbum, type: mType, link: mLink };
    if (mPassword == "DEVDUO1998") {
        MongoClient.connect(url, function (err, db) {
            if (err) {

                throw err;
            }
            var dbo = db.db("mydb");
            dbo.collection("chords").insertOne(chordObject, function (err, res) {
                if (err) throw err;
                console.log("inserted");
                db.close();
            });
        });
        res.end("OK");
    }
    else {
        res.end(".l.");
    }
};

exports.read_a_thing = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("chords").find({}, { projection: { _id: 0, name: 1, artis: 2, album: 3, type: 4, link: 5 } }).toArray(function (err, result) {
            if (err) throw err;
            result.forEach(function (result) {
                console.log(result);
            });
            res.json(result);
            db.close();
        });
    });
};
exports.update_a_thing = function (req, res) {

};
exports.delete_a_thing = function (req, res) {
    var mPassword = req.query.password;
    if (mPassword == "LLLL1998") {
        var mName = req.query.name + "";
        var mArtis = req.query.artis + "";
        var mAlbum = req.query.album + "";
        var mType = req.query.type + "";
        var mLink = req.query.link + "";

        var mQuery;

        if (mName == ('undefined')) { console.log("Enter no name"); }
        else {
            // console.log("Enter name");
            mQuery = { name: mName };
        }
        if (mArtis == ('undefined')) { console.log("Enter no artis"); }
        else {
            // console.log("Enter artis");
            mQuery = { name: mName, artis: mArtis };
        }

        if (mAlbum == ('undefined')) { console.log("Enter no album"); }
        else {
            //  console.log("Enter album");
            mQuery = { name: mName, artis: mArtis, album: mAlbum };
        }
        if (mType == ('undefined')) { console.log("Enter no type"); } else {
            // console.log("Enter type");
            mQuery = { name: mName, artis: mArtis, album: mAlbum, type: mType };
        }
        if (mLink == ('undefined')) { console.log("Enter no link"); } else {
            // console.log("Enter link");
            mQuery = { name: mName, artis: mArtis, album: mAlbum, type: mType, link: mLink };
        }
        console.log(mQuery);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("chords").deleteOne(mQuery, function (err, obj) {
                if (err) throw err;
                res.end('deleted');
                db.close();
            });
        });
    }
    else
        res.end('.l.');
};
