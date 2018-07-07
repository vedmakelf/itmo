var mysql = require("mysql");
var router = {};
module.exports = router;

var connection = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysite"
};

/**
 * функция выполняющий запрос в бд
 * @param {string} sqlQuery 
 * @param {function} calback 
 */
router.query = (sqlQuery, calback) => {
  var connect = mysql.createConnection(connection);
  connect.query(sqlQuery, calback);
  connect.end();
};

/**
 * функция вставки в бд
 * @param {string} query 
 * @param {object} values 
 * @param {function} calback 
 */
router.insert = (query, values, calback) => {
  var connect = mysql.createConnection(connection);
  connect.query(query, values, calback);
  connect.end();
};

/**
 * функция изменение записи в бд
 * @param {string} query 
 * @param {object} values 
 * @param {function} calback 
 */
router.update = (query, values, calback) => {
  var connect = mysql.createConnection(connection);
  connect.query(query, values, calback);
  connect.end();
};
