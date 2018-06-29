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

server.listen(8080, error => {
  console.log(`star server; port: 8080`);
});

var userRout = require("./routes/router.js");
app.use("/db", userRout);

app.use(express.static("public"));
