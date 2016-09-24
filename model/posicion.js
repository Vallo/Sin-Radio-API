var db = require('./db.js');


exports.findAll = function(){
	return db.query('select android_id, x(latlon) as lat, y(latlon) as lon, estado from posicion').then(function(result){
		return result;
	});
};


exports.findbyId = function(id){
	return db.query('select android_id, x(latlon) as lat, y(latlon) as lon, estado from posicion where android_id = ?', id).then(function(result){
		return result[0];
	});
};

exports.findCloserToPoint  = function(lat, lon){
	return db.query('SELECT android_id, x(latlon), y(latlon), estado, fecha from posicion where glength(LineStringFromWKB(LineString(GeomFromText(astext(PointFromWKB(latlon))),GeomFromText(astext(PointFromWKB(POINT(?, ?)))))))*100 < ?',
		lat,lon, 3).then(function(result){
			return result;
		});
};

exports.upsert = function(chofer){
	return db.query("insert into posicion (android_id, latlon, estado) values (?,point(?,?),?) on duplicate key update latlon = values(latlon), estado = values(estado);", [chofer.id, chofer.lat, chofer.lon, chofer.estado]).then(function(result){
		return result[0];
	});
};