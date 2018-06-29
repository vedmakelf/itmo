var mongoClient = require("mongodb").MongoClient; // Строка подлючения
var mongodb = require("mongodb");
var url = "mongodb://localhost:27017/";
var express = require("express");

var db = {};
module.exports = db;

/**
 *
 * @param {Function} func
 */
function connectDB(func) {
  mongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, dbs) {
      if (err) {
        throw new Error(err.message);
      }
      try {
        func(dbs);
      } catch (error) {
        console.error(error);
      } finally {
        dbs.close();
      }
    }
  );
}

/**
 *
 * @param {object} params
 * @param {Response} res
 */
db.add = function(params, res) {
  connectDB(dbs => {
    var collection = dbs.db("tasklist").collection("user");
    collection.insert(params, (err, result) => {
      if (err) {
      }
      res.send(result.ops);
    });
  });
};

db.delete = function(params, res) {
  connectDB(dbs => {
    var collection = dbs.db("tasklist").collection("user");
    for (let index = 0; index < params.arr.length; index++) {
      collection.deleteOne({
        _id: new mongodb.ObjectID(params.arr[index])
      });
    }
    db.allElement(res);
  });
};

db.allElement = function(res) {
  connectDB(dbs => {
    var collection = dbs.db("tasklist").collection("user");
    collection.find().toArray(function(err, result) {
      res.send(result);
    });
  });
};
