var express = require('express');
var router = express.Router();	
var cliente = require('../model/cliente.js');
var viajes = require('../model/viajes.js');

router.get('/viajes', function(req,res){
	var mail = req.get('mail');
	viajes.findbyCliente(mail).then(function(chof){
			if(!chof){ //chofer inexistente
				res.status(410);
				res.send('Sin viajes');
			}
			else { 
				res.status(200);
				res.send(chof);
			}
		});
});