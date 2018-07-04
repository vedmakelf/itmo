var mysql = require("mysql");
var router = {};
module.exports = router;

var connection = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysite"
};

router.query = (sqlQuery, calback) => {
  var connect = mysql.createConnection(connection);
  connect.query(sqlQuery, calback);
  connect.end();
};

router.insert = (query, values, calback) => {
  var connect = mysql.createConnection(connection);
  connect.query(query, values, calback);
  connect.end();
};
