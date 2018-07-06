var express = require("express");
var router = express.Router();
var db = require("../db.js");
var url = require("url");
var format = require("date-format");
var fs = require("fs");

module.exports = router;

router.get("/add", function(req, res, next) {
  res.render("applications/add");
});

router.get("/file", function(req, res, next) {
  var data = url.parse(req.url, true).query;
  if (data.item && typeof parseInt(data.item) === "number") {
    db.query(
      `SELECT 
  idscanapplication,
  name,
  data
FROM mysite.scanapplication
where idscanapplication = ${data.item}`,
      (err, rows, fields) => {
        if (!err) {
          if (rows.lenght !== 0) {
            res.writeHead(200, {
              "Content-Type": "application/pdf",
              "Content-Disposition": "inline",
              "Content-Length": rows[0].data.length
            });
            res.end(rows[0].data);
          }
        } else {
          console.error(err.message);
        }
      }
    );
  }
});

router.post("/edit", function(req, res, next) {
  if (req.files.scanApplication) {
    if (req.body.idscanapplication !== "") {
      db.insert(
        `UPDATE scanapplication SET ? where idscanapplication = ${
          req.body.idscanapplication
        }`,
        {
          name: req.files.scanApplication.name,
          data: req.files.scanApplication.data
        },
        (err, result) => {
          if (!err) {
            updateApplication(req.body.idscanapplication, req, res);
          } else {
            console.error(err.message);
            res.send(JSON.stringify({ result: false, err: err }));
          }
        }
      );
    } else {
      db.insert(
        "INSERT INTO `scanapplication` SET ?",
        {
          name: req.files.scanApplication.name,
          data: req.files.scanApplication.data
        },
        (err, result) => {
          if (!err) {
            updateApplication(result.insertId, req, res);
          } else {
            console.error(err.message);
            res.send(JSON.stringify({ result: false, err: err }));
          }
        }
      );
    }
  } else {
    updateApplication(null, req, res);
  }
});

function updateApplication(params, req, res) {
  db.update(
    `UPDATE applications SET ? where idapplications = ${
      req.body.idapplications
    }`,
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
        res.send(
          JSON.stringify({
            result: true,
            info: result,
            err: null
          })
        );
      } else {
        console.error(err.message);
        res.send(JSON.stringify({ result: false, err: err }));
      }
    }
  );
}

router.get("/edit", function(req, res, next) {
  var data = url.parse(req.url, true).query;
  if (data.item && typeof parseInt(data.item) === "number") {
    db.query(
      `SELECT 
  applications.idapplications,
  applications.applicationNo,
  applications.condition,
  applications.note,
  applications.fromWhomFIO,
  applications.subdivision,
  applications.forWhomFIO,
  applications.position,
  applications.room,
  applications.departureDate,
  applications.dateOfRegistration,
  scanapplication.idscanapplication,
  scanapplication.name
FROM mysite.applications
left join mysite.scanapplication on scanapplication.idscanApplication = applications.idscanApplication
where applications.idapplications = ${data.item}`,
      (err, rows, fields) => {
        if (!err) {
          if (rows.lenght !== 0) {
            res.render("applications/edit", {
              options: [
                {
                  value: "На рассмотрение",
                  text: "На рассмотрение",
                  selected:
                    rows[0].condition === "На рассмотрение" ? true : false
                },
                {
                  value: "В работе",
                  text: "В работе",
                  selected: rows[0].condition === "В работе" ? true : false
                },
                {
                  value: "Выполнено",
                  text: "Выполнено",
                  selected: rows[0].condition === "Выполнено" ? true : false
                },
                {
                  value: "Отклонено",
                  text: "Отклонено",
                  selected: rows[0].condition === "Отклонено" ? true : false
                }
              ],
              row: {
                idapplications: rows[0].idapplications,
                applicationNo: rows[0].applicationNo,
                condition: rows[0].condition,
                note: rows[0].note,
                fromWhomFIO: rows[0].fromWhomFIO,
                subdivision: rows[0].subdivision,
                forWhomFIO: rows[0].forWhomFIO,
                position: rows[0].position,
                room: rows[0].room,
                departureDate: format.asString(
                  "yyyy-MM-dd",
                  rows[0].departureDate
                ),
                dateOfRegistration: format.asString(
                  "yyyy-MM-dd",
                  rows[0].dateOfRegistration
                ),
                name: rows[0].name,
                idscanapplication: rows[0].idscanapplication,
                href: `file?item=${rows[0].idscanapplication}`
              }
            });
          }
        }
      }
    );
  }
});

router.get("/view", function(req, res, next) {
  db.query(
    `SELECT 
  applications.idapplications,
  applications.applicationNo,
  applications.condition,
  applications.note,
  applications.fromWhomFIO,
  applications.subdivision,
  applications.forWhomFIO,
  applications.position,
  applications.room,
  applications.departureDate,
  applications.dateOfRegistration,
  scanapplication.idscanapplication,
  scanapplication.name
FROM mysite.applications
left join mysite.scanapplication on scanapplication.idscanApplication = applications.idscanApplication
order by idapplications`,
    (err, rows, fields) => {
      rows.forEach((item, i, arr) => {
        item.href = `file?item=${item.idscanapplication}`;
      });
      res.render("applications/view", { stooges: rows });
    }
  );
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
          res.send(JSON.stringify({ result: false, err: err }));
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
        res.send(
          JSON.stringify({
            result: true,
            info: result,
            err: null
          })
        );
      } else {
        console.error(err.message);
        res.send(JSON.stringify({ result: false, err: err }));
      }
    }
  );
}
