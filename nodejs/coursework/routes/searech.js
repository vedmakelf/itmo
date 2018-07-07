var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var db = require("../db.js");

module.exports = router;

/**
 * поиск ФИО в таблице users
 */
router.use("/fio", function(req, res, next) {
  db.query(
    `SELECT * FROM users where FIO like '${req.body.query}%' LIMIT 0, 10`,
    (err, rows, fields) => {
      if (!err) {
        var arr = Array.from(rows, item => {
          return { value: item["FIO"], data: item["Position"] };
        });
        res.send(
          JSON.stringify({
            query: "/searech/fio",
            suggestions: arr
          })
        );
      } else {
        console.error(err.message);
        res.send(
          JSON.stringify({
            query: "/searech/fio",
            suggestions: null
          })
        );
      }
    }
  );
});
