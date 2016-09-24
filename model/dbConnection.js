var mysql = require('promise-mysql');

pool = mysql.createPool({
  host     : 'localhost',
	  user     : 'test',
	  password : '1234',
	  database : 'test',
	  port: '3307',
  connectionLimit: 10
});

function getSqlConnection() {
  return pool.getConnection().disposer(function(connection) {
    pool.releaseConnection(connection);
  });
}

module.exports = getSqlConnection;