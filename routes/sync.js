var express = require('express');
var router = express.Router();	
var viajes = require('../model/viajes.js');
var Promise = require("bluebird");

router.get('/viajes', function(req,res){

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
router.get('/emergencias', function(req,res){

});



module.exports = router;