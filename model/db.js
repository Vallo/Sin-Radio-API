var Promise = require("bluebird");
var getSqlConnection = require('./dbConnection');



exports.init = function(){
	Promise.using(getSqlConnection(), function(connection) {
    return connection.query("CREATE database if not exists test ").
		then(connection.query("CREATE TABLE IF NOT EXISTS chofer (android_id varchar(50), tel int primary key, nombre varchar(50), claveSMS int)")).
		then(connection.query("CREATE TABLE IF NOT EXISTS posicion (android_id varchar(50) primary key, lat double , lon double, estado int , fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)")).
			catch(function(error) {
      console.log(error);
    });
	console.log('db incializada');
})}



exports.query = function(consulta, param){
	return Promise.using(getSqlConnection(), function(connection){
		return connection.query(consulta, param).then(function(rows){
			return rows;
		}).catch(function(error){
			console.log(error);
			throw error;
		});
	});
}
/*
exports.query = function(consulta){
	return Promise.using(getSqlConnection(), function(connection){
		return connection.query(consulta).
		then(function(rows){
			console.log("asd" + rows); 
			return rows
		}).catch(function(error){
			console.log(error);
		}).finally(function(){
			console.log("FIN");
		});
	});
}
/*
exports.query = function(query, param){
	var consulta = connection.query(query, param, function(err, rows,fields) {
	  	if (err) throw err;
	  	console.log('query ok');  	
		return rows;
	});
}
exports.query = function(query, param, callback){
	var query = connection.query("SELECT 1 as ok", param)
	query.on('error', function(err){
		throw err;
	});
	query.on('fields', function(fields){
		for(var propName in fields) {
		    propValue = fields[propName]
		    console.log(propName,propValue);
		}
	  	console.log("ok " + fields);
	});
	query.on('result',function(rows){
		console.log("result: " + rows);
	  	console.log("asdasd" + rows.ok);  
		var propValue;
		for(var propName in rows) {
		    propValue = rows[propName]
		    console.log(propName,propValue);
		}
		console.log("----------------")
		callback(rows);
	});
}
*/