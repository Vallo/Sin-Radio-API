var Promise = require("bluebird");
var getSqlConnection = require('./dbConnection');



exports.init = function(){
	Promise.using(getSqlConnection(), function(connection) {
    return connection.query("CREATE database if not exists test ").
		then(connection.query("CREATE TABLE IF NOT EXISTS chofer (android_id varchar(50), tel int primary key, nombre varchar(50), claveSMS int)")).
		then(connection.query("CREATE TABLE IF NOT EXISTS posicion (android_id varchar(50) primary key, latlon point, estado int , fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)")).
		then(connection.query("CREATE TABLE IF NOT EXISTS VIAJES (ID INT PRIMARY KEY AUTO_INCREMENT, CHOFER VARCHAR(50), LATLON POINT, DIR VARCHAR(200), fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")).
		then(connection.query("CREATE VIEW VIAJES_PENDIENTES AS SELECT ID, CHOFER, X(LATLON) AS LAT,  Y(LATLON) AS LON, FECHA, DIR FROM VIAJES WHERE CHOFER IS NULL AND FECHA > (CURRENT_TIMESTAMP + INTERVAL 2 MINUTE)")).
			catch(function(error) {
      console.log(error);
    });
	//console.log('db incializada');
});};



exports.query = function(consulta, param){
	return Promise.using(getSqlConnection(), function(connection){
		return connection.query(consulta, param).then(function(rows){
			return rows;
		}).catch(function(error){
			console.log(error);
			throw error;
		});
	});
};