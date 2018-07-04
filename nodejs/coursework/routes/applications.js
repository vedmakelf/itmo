var express = require("express");
var router = express.Router();
var db = require("../db.js");

module.exports = router;

router.get("/add", function(req, res, next) {
  res.render("applications/add");
});

router.post("/add", function(req, res, next) {
  if (req.files.scanApplication) {
    db.insert(
      "INSERT INTO `scanapplication` SET ?",
      {
        name: req.files.scanApplication.name,
        data: req.files.scanApplication.data
      },
      (err, result) => {
        if (!err) {
          insertApplication(result.insertId, req, res);
        } else {
          console.error(err.message);
        }
      }
    );
  } else {
    insertApplication(null, req, res);
  }
});

function insertApplication(params, req, res) {
  db.insert(
    "INSERT INTO `applications` SET ?",
    {
      applicationNo: req.body.applicationNo,
      condition: req.body.condition,
      note: req.body.note.toString(),
      fromWhomFIO: req.body.fromWhomFIO,
      subdivision: req.body.subdivision,
      forWhomFIO: req.body.forWhomFIO,
      position: req.body.position,
      room: req.body.room,
      departureDate:
        req.body.departureDate !== "" ? req.body.departureDate : null,
      dateOfRegistration: req.body.dateOfRegistration,
      idscanApplication: params
    },
    (err, result) => {
      if (!err) {
        res.send("");
      } else {
        console.error(err.message);
      }
    }
  );
}
