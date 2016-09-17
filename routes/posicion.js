var express = require('express');
var router = express.Router();	
var posicion = require('../model/posicion.js');


router.get('/', function(req,res){
	posicion.findAll().then(function(result){
		res.status(200);
		res.send(JSON.stringify(result));
	}).catch(function(err){
		res.status(500);
		res.send('Error interno');
	})
});


router.get('/:id', function(req,res){
	posicion.findbyId(req.params.id).then(function(result){
		res.status(200);
		res.send(JSON.stringify(result));
	}).catch(function(err){
		res.status(500);
		res.send('Error interno');
	})
});


router.post('/:id', function(req,res){ //recibo posicion 
	var lat = req.body.lon;
	var lon = req.body.lat;
	var estado = req.body.estado;
	var id = req.params.id;
	var chofer = new Object({lat,lon,estado,id});
	posicion.upsert(chofer).then(function(chof){
		res.status(200); 
		res.send('OK');
	}).catch(function(err){
		res.status(400);
		console.log(err);
		res.send('Algo explotó');
	});
});

module.exports = router;