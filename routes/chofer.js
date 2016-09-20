var express = require('express');
var router = express.Router();	
var chofer = require('../model/chofer.js');
var sms = require('../helper/sms.js')

router.get('/', function(req,res){
	chofer.findAll().then(function(result){
		res.status(200);
		res.send(JSON.stringify(result));
	}).catch(function(err){
		res.status(500);
		res.send('Error interno');
	})
});


router.get('/:id', function(req,res){
	var android = req.params.id;
	chofer.findbyId(android).then(function(chof){
			if(!chof){ //chofer inexistente
				res.status(410);
				res.send('Chofer inexistente');
			}
			else { 
				res.status(200);
				res.send(chof);
			}
		});
});


router.get('/sendSMS/:id', function(req,res){ //envío clave al teléfono id por sms
	var tel = req.params.id;
	chofer.findbyTel(req.params.id).then(function(chof){
		if(!chof){ //hay que registrarlo antes desde la central
			res.status(410);
			res.send('Chofer inexistente');
		}
		else{
			sms.sendSms(chof.tel, chof.claveSMS); // tengo el tel mando sms	
			res.sendStatus(200); // todo ok
		}
	});
});

router.delete('/:id',function(req,res){ //eliminar chofer, validar que la solicitud venga de la central 
	chofer.delete(req.params.id);
	res.status(200);
	res.send('OK');
});


router.post('/', function(req,res){ //agrego nuevo chofer recibo tel y nombre por param
	var telefono = req.body.tel;
	var nombre = req.body.nombre;
	chofer.add(nombre,telefono).then(function(chof){
		res.status(200);
		res.send('OK'); //res.send(JSON.stringify(chof));
	}).catch(function(err){		
		res.status(400);
		res.send('Chofer ya existente');
	});
});

router.post('/token/:id', function(req,res){
	var token = req.body.token;
	var id = req.params.id;
	if(!token || !id) {
		res.status(400);
		res.send('Error');
	}
	chofer.upsertToken(id,token).then(function(res){
		res.status(200);
		res.send('OK');
	}).catch(function(err){
		res.status(500);
		res.send('Error');
	})
})

router.put('/:id', function(req,res){ //se valida la clave SMS
	var android = req.params.id;
	var tel = req.body.tel;
	var clave = req.body.claveSMS;
	chofer.findbyTel(tel).then(function(chof){
		if(!chof){ //hay que registrarlo antes desde la central
			res.status(410);
			res.send('Chofer inexistente');
		}
		else{
			chofer.setClave(tel,android,clave).then(function(result){ //todo ok
				res.sendStatus(200);
			}).catch(function(error){
				if(error.Exception == 'MysqlException')
				{
					res.status(500)
					res.send('Error interno: ' + error.message);
				}
				else if(error.Exception == 'ClaveInvalidaException')
					res.status(400);
					res.send(error.message);
			});
		}
	});
});

module.exports = router;