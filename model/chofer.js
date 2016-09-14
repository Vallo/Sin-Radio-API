var db = require('./db.js');
var promise = require("bluebird");

var Promise = require("bluebird");
var getSqlConnection = require('./dbConnection');


exports.test = function(){
	db.query('select 1 as test');
}

exports.findbyId = function(id){
	var result = db.query('select * from chofer where id = ?', id);
}

exports.findbyTel = function(tel){
	
	return db.query("select * from chofer where tel = ?", tel).then(function(result){
		return result;
	});


}

exports.add = function(nombre, tel){
	var exists = this.findbyTel(tel).then(function(exists){
		if (exists.affectedRows > 0) {console.log("ERROR");}
	})	
	var random = Math.floor((Math.random() * 10000) + 1);
	console.log(tel + " - " + random);
	var result = db.query('insert into chofer (nombre, tel, claveSMS) values (?,?,?)', [nombre,tel, random]);
	console.log(random);
}