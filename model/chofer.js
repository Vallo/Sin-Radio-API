var db = require('./db.js');

exports.findAll = function(){
	return db.query('select * from chofer').then(function(result){
		return result;
	});
};
exports.findbyId = function(id){
	return db.query('select * from chofer where android_id = ?', id).then(function(result){
		return result[0];
	});
};

exports.findbyTel = function(tel){
	return db.query("select * from chofer where tel = ?", tel).then(function(result){
		return result[0];
	});
};

exports.delete = function(id){
	db.query("delete from chofer where android_id = ?", id);
};

exports.add = function(nombre, tel){
	var random = 2882//Math.floor((Math.random() * 10000) + 1);
	return db.query('insert into chofer (nombre, tel, claveSMS) values (?,?,?)', [nombre,tel, random]).then(function(result){
		return result;
	});
};


exports.upsertToken = function(id,token){
	return db.query("insert into posicion (android_id, token) values (?,?) on duplicate key update token = values(token);", [id, token]).then(function(result){
		return result[0];
	});
};

exports.getToken = function(id){
	return db.query("select token from posicion where android_id = ?", id).then(function(result){
		return result[0];
	});
}

exports.addEmergencia = function(id,lat,lon){
	return db.query("insert into emergencias(android_id,latlon) values (?,point(?,?))", [id,lat,lon]);
}

exports.setClave = function(tel, android, clave){
	console.log(tel + android + clave);
	return db.query("update chofer set android_id = ? where tel = ? and claveSMS = ?", [android, tel, clave]).then(function(result){
		if (result.affectedRows === 0) {
			throw new CustomException('ClaveInvalidaException','La clave ingresada es incorrecta');
		}
	});
};



function CustomException(name_, message_) {
	this.Exception = name_;
	this.message = message_;
}