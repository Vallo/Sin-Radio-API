var db = require('./db.js');


exports.findAll = function(){
	return db.query('select * from viajes').then(function(result){
		return result;
	})
}


exports.findbyId = function(id){
	return db.query('select * from viajes where id = ?', id).then(function(result){
		return result[0];
	});
}

exports.findSinAsignar = function(id){
	return db.query('select * from viajes where id = ? and CHOFER is null', id).then(function(result){
		return result[0];
	});
}


exports.findPending = function(id){
	return db.query('select * from viajesPendientes').then(function(result){
		return result;
	});
}


exports.insert = function(viaje){
	return db.query('insert into viajes (lat, lon, dir) values (?,?,?)',[viaje.lat, viaje.lon, viaje.dir]).then(function(result){
		return result;
	}).catch(function(error){
		throw error
	});
}