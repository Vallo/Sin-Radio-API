var express = require('express');
var router = express.Router();
var viajes = require('../model/viajes.js');


/* GET home page. */
router.get('/', function(req, res) {
	viajes.findAll().then(function(result){
		res.send(JSON.stringify(result));
	});
});

router.get('/pendientes', function(req, res) {
	viajes.findPending().then(function(result){
		res.send(JSON.stringify(result));
	});
});

router.post('/', function(req, res) { 
	var _lat = req.body.lat;
	var _lon = req.body.lon;
	var _dir = req.body.dir;
	var _cliente = req.body.mail;
	var _detalle = req.body.detalle;
	var _id = req.body.idLocal;
	if (!_lat || !_lon || !_dir) {
		console.log(_lat + _lon + _dir);
		res.status(400);
		res.send('Error');
		console.log('error');
		return;
	}
	else{
		var viaje = new Object({lat : _lat, lon : _lon, dir : _dir, cliente : _cliente, detalle : _detalle, idLocal : _id});
		viajes.insert(viaje).then(function(idViaje){
			res.status(200);
			res.send('OK');
			viajes.notificarChoferes(viaje, idViaje);
		}).catch(function(err){
			res.status(500);
			console.log(err);
			res.send('Error insertando viaje');
		});
	}
});


router.post('/:id(\\d+)/', function(req, res) { //un chofer aceptó el viaje
	var android_id = req.body.android_id;
	var idViaje = req.params.id;
	viajes.AsignarViajeAChofer(idViaje, android_id).then(function(){
			res.status(200);
			res.send('OK');
	}).catch(function(){
		res.status(400);
		res.send('Viaje ya asignado');
	});
});


router.put('/:id(\\d+)/', function(req, res) { //ASIGNO MONTO 
	var android_id = req.body.android_id;
	var idViaje = req.params.id;
	var monto = req.body.monto;
	viajes.AsignarMontoAViaje(idViaje, android_id, monto).then(function(){
			res.status(200);
			res.send('OK');
	}).catch(function(error){
		console.log(error);
		res.status(400);
		res.send('Error asignando monto');
	});
});
module.exports = router;
