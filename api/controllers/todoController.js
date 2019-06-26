'use strict'
var mongo = require('mongodb');
const fs = require('fs');
var MongoClient = mongo.MongoClient;
var url = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const client = new MongoClient(url, { useNewUrlParser: true });

exports.write_all_data = function (req, res) {
    var baseData=fs.readFileSync('base.json');
    var baseJson=JSON.parse(baseData);
    var data = fs.readFileSync('update.json');
    var updateJson = JSON.parse(data);
    updateJson.Update.forEach((result) => {
        baseJson.Sheet1.push(result);
    });
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
    res.json(baseJson);
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
        // MongoClient.connect(url, function (err, db) {
        //     if (err) {

        //         throw err;
        //     }
        //     var dbo = db.db("mydb");
        //     dbo.collection("chords").insertOne(chordObject, function (err, res) {
        //         if (err) throw err;
        //         console.log("inserted");
        //         db.close();
        //     });
        // });
        fs.readFile('update.json', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                var obj = JSON.parse(data); //now it an object
                obj.Update.push(chordObject); //add some data
                var json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('update.json', json, function (err) { }); // write it back 
            }
        });
        res.end("OK");
    }
    else {
        res.end(".l.");
    }
};

exports.read_a_thing = function (req, res) {
    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("mydb");
    //     dbo.collection("chords").find({}, { projection: { _id: 0, name: 1, artis: 2, album: 3, type: 4, link: 5 } }).toArray(function (err, result) {
    //         if (err) throw err;
    //         result.forEach(function (result) {
    //             console.log(result);
    //         });
    //         res.json(result);
    //         db.close();
    //     });
    // });
    var updateFile = require('../../update.json');
    res.json(updateFile);
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

        // var mQuery;

        // if (mName == ('undefined')) { console.log("Enter no name"); }
        // else {
        //    // console.log("Enter name");
        //     mQuery = { name: mName };
        // }
        // if (mArtis == ('undefined')) { console.log("Enter no artis"); }
        // else {
        //    // console.log("Enter artis");
        //     mQuery = { name: mName, artis: mArtis };
        // }

        // if (mAlbum == ('undefined')) { console.log("Enter no album"); }
        // else {
        //   //  console.log("Enter album");
        //     mQuery = { name: mName, artis: mArtis, album: mAlbum };
        // }
        // if (mType == ('undefined')) { console.log("Enter no type"); } else {
        //    // console.log("Enter type");
        //     mQuery = { name: mName, artis: mArtis, album: mAlbum, type: mType };
        // }
        // if (mLink == ('undefined')) { console.log("Enter no link"); } else {
        //    // console.log("Enter link");
        //     mQuery = { name: mName, artis: mArtis, album: mAlbum, type: mType, link: mLink };
        // }
        // console.log(mQuery);
        // MongoClient.connect(url, function (err, db) {
        //     if (err) throw err;
        //     var dbo = db.db("mydb");
        //     dbo.collection("chords").deleteOne(mQuery, function (err, obj) {
        //         if (err) throw err;
        //         res.end('deleted');
        //         db.close();
        //     });
        // });
        var data = fs.readFileSync('update.json');
        var json = JSON.parse(data);
        var newJson ={"Update":[]};
        json.Update.forEach((result) => {
            if (result.name === mName) {
                console.log(result.name+" is "+mName);
            }
            else {
                console.log(result.name+" is not"+mName);
                newJson.Update.push(result);
            }
        });
        fs.writeFile('update.json', JSON.stringify(newJson), function (err) { }); // write it back 
        res.json(newJson);
    }
    else
        res.end('.l.');
};
