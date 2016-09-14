var mysql = require('promise-mysql');

pool = mysql.createPool({
  host     : 'localhost',
	  user     : 'root',
	  password : '1234',
	  database : 'test',
  connectionLimit: 10
});

function getSqlConnection() {
  return pool.getConnection().disposer(function(connection) {
    pool.releaseConnection(connection);
  });
}

module.exports = getSqlConnection;