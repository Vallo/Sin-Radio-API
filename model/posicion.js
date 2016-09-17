var db = require('./db.js');


exports.findAll = function(){
	return db.query('select * from posicion').then(function(result){
		return result;
	})
}


exports.findbyId = function(id){
	return db.query('select * from posicion where android_id = ?', id).then(function(result){
		return result[0];
	});
}


exports.upsert = function(chofer){
	return db.query("insert into posicion (android_id, lat, lon, estado) values (?,?,?,?) on duplicate key update lat = values(lat), lon = values(lon), estado = values(estado);", [chofer.id, chofer.lat, chofer.lon, chofer.estado]).then(function(result){
		return result[0];
	});
}