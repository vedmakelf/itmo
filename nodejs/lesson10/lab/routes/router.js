var express = require("express");
var router = express.Router();
var db = require("./../db.js");

module.exports = router;

router.post("/add", function(req, res, next) {
  db.add(req.body, res);
});

router.post("/allElement", function(req, res, next) {
  db.allElement(res);
});

router.post("/delete", function(req, res, next) {
  db.delete(req.body, res);
});
