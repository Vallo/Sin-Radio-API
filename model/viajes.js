var db = require('./db.js');
var notifications = require('../helper/notifications.js');
var posicion = require('./posicion.js');
var radioCliente = require('../config.js').radioNotif.cliente;


exports.findAll = function(){
	return db.query('select *, x(latlon) as lat, y(latlon) as lon from viajes').then(function(result){
		return result;
	});
};


exports.findbyId = function(id){
	return db.query('select id,chofer, x(latlon) as lat, y(latlon) as lon, dir, detalle from viajes where id = ? order by fecha desc', id).then(function(result){
		return result[0];
	});
};

exports.findbyChofer = function(id){
	return db.query('select id, x(latlon) as lat, y(latlon) as lon, dir, monto, fecha, detalle from viajes where chofer = ? order by fecha desc', id).then(function(result){
		return result;
	});
};

exports.findbyCliente = function(id){
	return db.query('select id, x(latlon) as lat, y(latlon) as lon, dir, monto, fecha, detalle, nombre as chofer from viajes v inner join chofer c on c.android_id = v.chofer where cliente = ? order by fecha desc', id).then(function(result){
		return result;
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
	return db.query('update viajes set chofer = ?, estado = 1 where chofer is null and id = ?', [idChofer, idViaje]).then(function(result){
		if (result.affectedRows === 0){
			throw new Error();
		}
		return result;
	});
};


exports.insert = function(viaje){
	return db.query('insert into viajes (latlon, dir, cliente, ESTADO, detalle) values (point(?,?),?,?, 0, ?)',[viaje.lat, viaje.lon, viaje.dir, viaje.cliente, viaje.detalle]).then(function(result){
		return result.insertId;
	}).catch(function(error){
		throw error;
	});
};

exports.AsignarMontoAViaje = function(idViaje, idChofer, monto){
	return db.query('update viajes set estado = 3, monto = ? where chofer = ? and id = ?', [monto, idChofer, idViaje]).then(function(result){
		if (result.affectedRows === 0){
			throw new Error();
		}
		return result;
	});
};

exports.NotifPasajero = function(choferPos){
	console.log(choferPos);
	return  //db.query('select id, cliente from viajes where estado = 1 and cliente is not null and glength(LineStringFromWKB(LineString(GeomFromText(astext(PointFromWKB(latlon))),GeomFromText(astext(PointFromWKB(POINT(?, ?)))))))/10 < ? and chofer = ?', ).
	db.query("select id, cliente from viajes where cliente is not null and estado = 1 and chofer = ? and 111.1111 * DEGREES(ACOS(COS(RADIANS(X(latlon))) * COS(RADIANS(?LAT))* COS(RADIANS(Y(latlon) - (?LON)))+ SIN(RADIANS(X(latlon))) * SIN(RADIANS(?LAT)))) *1000< ?",[choferPos.id,choferPos.lat,choferPos.lon,choferPos.lat, radioCliente]).
	then(function(result){ 
		if(result.length > 0 ){//estoy cerca del cliente, envío notif y pongo estado = 2
			console.log(result);
			db.query('update viajes set estado = 2 where id = ?', result[0].id);
			db.query('select token from TOKENS where cliente = ?', result[0].cliente).then(function(result){
				notifications.sendNotificationPasajero(result.token, {"title":"Su chofer ha arribado!","body":"Patente: ABC-123"});
			});
		}
	});
};

exports.notificarChoferes = function(viaje, id){
	posicion.findCloserToPoint(viaje.lat,viaje.lon).then(function(choferes){
		choferes.forEach(function(chofer){
			notifications.sendNotification(chofer.token, {"idViaje":id, "lat":viaje.lat, "lon":viaje.lon, "detalle":viaje.detalle, "title":"Nuevo viaje!","body":viaje.dir});
		});
	});
};
