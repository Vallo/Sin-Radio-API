var db = require('./db.js');
var notifications = require('../helper/notifications.js');

exports.findAll = function(){
	return db.query('select id,chofer, x(latlon) as lat, y(latlon) as lon, dir from viajes').then(function(result){
		return result;
	});
};


exports.findbyId = function(id){
	return db.query('select id,chofer, x(latlon) as lat, y(latlon) as lon, dir from viajes where id = ?', id).then(function(result){
		return result[0];
	});
};

exports.findSinAsignar = function(id){
	return db.query('select * from viajes where id = ? and CHOFER is null', id).then(function(result){
		return result[0];
	});
};


exports.findPending = function(id){
	return db.query('select * from viajesPendientes').then(function(result){
		return result;
	});
};


exports.insert = function(viaje){
	return db.query('insert into viajes (latlon, dir) values (point(?,?),?)',[viaje.lat, viaje.lon, viaje.dir]).then(function(result){
		return result;
	}).catch(function(error){
		throw error;
	});
};	


exports.notificarChoferes = function(viaje){
	db.findCloserToPoint(lat,lon).then(function(choferes){

	});
};