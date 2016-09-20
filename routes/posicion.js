var express = require('express');
var router = express.Router();	
var posicion = require('../model/posicion.js');
var GoogleMapsAPI = require('googlemaps');

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
	console.log("asd" + lat + lon + id);
	var chofer = new Object({lat,lon,estado,id});
	console.log(JSON.stringify(chofer));
	posicion.upsert(chofer).then(function(chof){
		res.status(200); 
		res.send('OK');
	}).catch(function(err){
		res.status(400);
		console.log(err);
		res.send('Algo explotó');
	});
});

router.get('/mapa/asd', function(req, res){
	try	{
		var publicConfig = {
			key: 'AIzaSyCkHdWm_AJQjYt-AjjRkXwPTesdFk8lmos',
			stagger_time:       1000, // for elevationPath
			encode_polylines:   false,
			secure:             true // use https
		};
		var gmAPI = new GoogleMapsAPI(publicConfig);
		var marker = [];
		posicion.findAll().then(function(result){
			result.forEach(function(current){
				console.log(current);	
				var marc = new Object({location: [current.lat, current.lon]})
				console.log('--------');			
				console.log(marc);
				marker.push(marc);
				console.log('++++-');
				console.log(marker);
			});
			return marker;
		}).then(function(marker){
			console.log('******');
			console.log(marker);
			var params = {
				location: '51.507868,-0.087689',
				size: '1200x1600',
				heading: 108.4,
				pitch: 7,
				fov: 40,
				markers: marker
			};
			console.log(params);
			console.log(gmAPI.staticMap(params));
			res.redirect(gmAPI.staticMap(params));
		});
	}
	catch(e){
		console.log(e);
	}
});

module.exports = router;