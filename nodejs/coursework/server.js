var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
var session = require("express-session");
var crypto = require("crypto");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var mustacheExpress = require("mustache-express");
app.set("views", "./views");
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
var mysql = require("mysql");
var fileUpload = require("express-fileupload");
app.use(fileUpload());
var fs = require("fs");

server.listen(8080, error => {
  console.log(`star server; port: 8080`);
});

app.use(express.static("./public"));

var applicationsRoute = require("./routes/applications.js");
app.use("/applications", applicationsRoute);

var applicationsRoute = require("./routes/searech.js");
app.use("/searech", applicationsRoute);

app.get("/", function(req, res, next) {
  res.render("index");
});

app.use(function(req, res, next) {
  fs.readFile("404.html", "utf8", function(err, data) {
    if (!err) {
      res.status(404).send(data);
    } else {
      console.error(err);
      res.send(404);
    }
  });
});
