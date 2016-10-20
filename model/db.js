var Promise = require("bluebird");
var getSqlConnection = require('./dbConnection');



exports.init = function(){
	Promise.using(getSqlConnection(), function(connection) {
		return connection.query("CREATE database if not exists test ").
		then(connection.query("CREATE TABLE IF NOT EXISTS chofer (android_id varchar(50), tel int primary key, nombre varchar(50), claveSMS int)")).
		then(connection.query("CREATE TABLE IF NOT EXISTS posicion (android_id varchar(50) primary key, token varchar(40), latlon point, estado int , fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)")).
		then(connection.query("CREATE TABLE IF NOT EXISTS viajes (ID INT PRIMARY KEY AUTO_INCREMENT,  DETALLE varchar(50), ESTADO INT, CHOFER VARCHAR(50), LATLON POINT, DIR VARCHAR(200), monto decimal(6,2), fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CLIENTE VARCHAR(75))")).
		then(connection.query("CREATE OR REPLACE VIEW VIAJES_PENDIENTES AS SELECT ID, CHOFER, X(LATLON) AS LAT,  Y(LATLON) AS LON, FECHA, DIR FROM viajes WHERE CHOFER IS NULL AND FECHA > (CURRENT_TIMESTAMP + INTERVAL 2 MINUTE)")).
		then(connection.query("CREATE TABLE IF NOT EXISTS TOKENS (CLIENTE varchar(50), TOKEN VARCHAR(40))")).
		catch(function(error) {
			console.log(error);
		});
	});
};



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