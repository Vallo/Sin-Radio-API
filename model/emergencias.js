var db = require('./db.js');

exports.addEmergencia = function(id,lat,lon){
	return db.query("insert into emergencias(android_id,latlon) values (?,point(?,?))", [id,lat,lon]);
}

exports.getNewerThan = function(id){
	return db.query("select nombre as chofer, X(latlon) as X, Y(latlon) as Y,fecha from emergencias e inner join chofer c on c.android_id = e.android_id where e.id > ?", [id]);
}