var db = require('./db.js');
var notifications = require('../helper/notifications.js');
var posicion = require('./posicion.js');

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

exports.findbyChofer = function(id){
	return db.query('select id, x(latlon) as lat, y(latlon) as lon, dir from viajes where chofer = ?', id).then(function(result){
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

exports.AsignarViajeAChofer = function(idViaje, idChofer){
	return db.query('update viajes set chofer = ? where chofer is null and id = ?', [idChofer, idViaje]).then(function(result){
		if (result.affectedRows === 0){
			throw new Error();
		}
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

exports.AsignarMontoAViaje = function(idViaje, idChofer, monto){
	return db.query('update viajes set monto = ? where chofer = ? and id = ?', [monto, idChofer, idViaje]).then(function(result){
		if (result.affectedRows === 0){
			throw new Error();
		}
		return result;
	});
};

exports.notificarChoferes = function(viaje){
	posicion.findCloserToPoint(lat,lon).then(function(choferes){
		choferes.forEach(function(chofer){
			notifications.sendNotification(chofer.token, null, 'Hola','Test');
		});
	});
};