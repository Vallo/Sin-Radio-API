var db = require('./db.js');
var promise = require("bluebird");

var Promise = require("bluebird");
var getSqlConnection = require('./dbConnection');


exports.test = function(){
	db.query('select 1 as test');
}

exports.findbyId = function(id){
	return db.query('select * from chofer where android_id = ?', id).then(function(result){
		return result[0];
	});
}

exports.findbyTel = function(tel){
	return db.query("select * from chofer where tel = ?", tel).then(function(result){
		return result[0];
	});
}

exports.add = function(nombre, tel){	
	var random = Math.floor((Math.random() * 10000) + 1);
	return db.query('insert into chofer (nombre, tel, claveSMS) values (?,?,?)', [nombre,tel, random]).then(
		function(result){
			return result;
		}).catch(function(error){
			console.log('error insertando chofer (chofer ya existente?)');
			return error;
		});
}

exports.setClave = function(tel, android, clave){
	return db.query("select * from chofer where tel = ? and claveSMS = ?", [tel, clave]).then(function(result){
		console.log("asd" + result);
		if (result.length > 0){
			return db.query("update chofer set android_id = ? where tel = ? and claveSMS = ?", [android, tel, clave]).then(function(result){
				return result[0];
			}).catch(function(error){
				return new Object({'Error':'algo explotó', 'Errno' : '2'});
			});
		}
		else{
			return new Object({'Error':'clave michetti'});
		}
	});
}
