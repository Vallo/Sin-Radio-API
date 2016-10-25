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


router.post('/token/:id', function(req,res){
	var token = req.body.token;
	var id = req.params.id;
	var mail = req.body.mail;
	if(!token || !mail) {
		res.status(400);
		res.send('Error');
	}
	cliente.upsertToken(mail,token).then(function(res){
		res.status(200);
		res.send('OK');
	}).catch(function(err){
		res.status(500);
		res.send('Error');
	})
});


module.exports = router;