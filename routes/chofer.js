
var express = require('express');
var router = express.Router();	
var chofer = require('../model/chofer.js');
var sms = require('../helper/sms.js')
var db = require('../model/db.js');

router.get('/', function(req,res){
	var id = 1//req.get('android_id');
	//chofer.findbyId(id);
});


router.get('/:id', function(req,res){ //envío clave al teléfono id s
	var android = req.params.id; CAMBIAR KASDJIOPASDJIOASD
	if (!android){	//no tengo el ID == todavía no validó SMS
		chofer.findbyTel(req.params.id).then(function(chof){
			if(!chof.tel){ //no tengo ni siquiera el tel!! hay que registrarlo antes desde la central
				return new Object({'Error':'chofer inexistente, debe registrarse antes', 'Errno' : '1'});
			}
			//sms.sendSms(chof.tel, chof.claveSMS); // tengo el tel mando sms
			
		}).then(function (resp){
			res.sendStatus(200);
		});
	}
	else{ //tengo android_id, está registrado devuelvo sus datos
		chofer.findbyId(android).then(function(chof){
			if (!chof){
				res.send(JSON.stringify(new Object({'Error':'chofer inexistente, debe registrarse antes', 'Errno' : '1'})));
			}
			res.send(JSON.stringify(chof));
		})
	}
});

router.put('/:id', function(req,res){
	var android = req.params.id;
	var tel = req.body.tel;
	var clave = req.body.claveSMS;
	console.log(android);	
	if(!android){
		res.send(new Object({'Error':'falta android_id', 'Errno' : '1'}));
		return;
	}
	chofer.findbyTel(req.params.id).then(function(chof){
			if(!chof){ //hay que registrarlo antes desde la central
				res.send(JSON.stringify( new Object({'Error':'chofer inexistente, debe registrarse antes', 'Errno' : '1'})));
			}
			chofer.setClave(tel,android,clave).then(function(result){
				res.send(JSON.stringify(result));
			});
		});
});

router.delete('/:id',function(req,res){ //eliminar chofer, validar que la solicitud venga de la central 

});


router.post('/', function(req,res){ //envío clave al teléfono id s
	var telefono = req.body.Tel;
	var nombre = req.body.Nombre;
	chofer.add(nombre,telefono).then(function(chof){
		res.send(JSON.stringify(chof));
	});

});
module.exports = router;