var express = require('express');
var router = express.Router();	
var viajes = require('../model/viajes.js');
var emergencias = require('../model/emergencias.js');
var Promise = require("bluebird");


router.get('/estadoViajes', function(req,res){ //envío por header los viajes generados localmente de los cuales quiero obtener estado.

	var viajesLocal = JSON.parse(req.get('viajes'));
	var	retorno = getViajes(viajesLocal).then(function(ret){
		res.status(200);
		res.send(JSON.stringify(ret));
	});
});

function getViajes(viajesLocal){
	return Promise.all(viajesLocal.map(getviaje));
}

function getviaje(idViaje){
	return viajes.findbyIdLocal(idViaje).then(function(result){
		if(result){
			return result;
		}
	})
}

router.get('/estadoViajesOnline', function(req,res){ //idem pero para viajes generados en al nube

	var viajesOnline = JSON.parse(req.get('viajes'));
	var	retorno = getViajesOnline(viajesOnline).then(function(ret){
		res.status(200);
		res.send(JSON.stringify(ret));
	});
});

function getViajesOnline(viajesOnline){
	return Promise.all(viajesOnline.map(getviajeOnline));
}

function getviajeOnline(idViaje){
	return viajes.findbyId(idViaje).then(function(result){
		if(result){
			return result;
		}
	})
}

router.get('/newViajesOnline', function(req,res){ //envio ID y retorno los nuevos viajes (mayores al id)

	var id = JSON.parse(req.get('id'));
	viajes.getOnlineNewerThan(id).then(function(ret){
		res.status(200);
		res.send(JSON.stringify(ret));
	});
});




router.get('/newEmergencias', function(req,res){ //idem newViajesOnline
	var id = JSON.parse(req.get('id'));
	emergencias.getNewerThan(id).then(function(ret){
		var emerg = []
		for (var i = 0; i < ret.length; i++) {
			emerg.push(new Object({
				chofer:ret[i].chofer,
				latlon:
				{
					lat:ret[i].X,
					lng:ret[i].Y
				},
				fecha:ret[i].fecha
			}));
		}
		console.log(emerg);
		res.status(200);
		res.send(JSON.stringify(emerg));
	});
});



module.exports = router;