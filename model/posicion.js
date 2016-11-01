var db = require('./db.js');
var radioChofer = require('../config.js').radioNotif.chofer;

exports.findAll = function(){
	return db.query('select c.android_id, x(latlon) as lat, y(latlon) as lon, fecha, estado, token, nombre from posicion p inner join chofer c on c.android_id = p.android_id').then(function(result){
		return result;
	});
};


exports.findbyId = function(id){
	return db.query('select android_id, x(latlon) as lat, y(latlon) as lon, estado from posicion where android_id = ?', id).then(function(result){
		return result[0];
	});
};

exports.findCloserToPoint  = function(lat, lon){
	return db.query("SELECT c.android_id, x(latlon), y(latlon), estado, token, fecha from posicion p inner join chofer c on c.android_id = p.android_id where glength(LineStringFromWKB(LineString(GeomFromText(astext(PointFromWKB(latlon))),GeomFromText(astext(PointFromWKB(POINT(?, ?)))))))/10 < ?",[lat,lon, radioChofer]).then(function(result){
			return result;
		});
}; //TIMESTAMPDIFF(SECOND,now(), fecha) < 30  agregar para no enviar a choferes sin señal

exports.upsert = function(chofer){
	return db.query("insert into posicion (android_id, latlon, estado) values (?,point(?,?),?) on duplicate key update latlon = values(latlon), estado = values(estado);", [chofer.id, chofer.lat, chofer.lon, chofer.estado]).then(function(result){
		return result[0];
	});
};