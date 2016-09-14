
var express = require('express');
var router = express.Router();	
var chofer = require('../model/chofer.js');

var db = require('../model/db.js');

router.get('/', function(req,res){
	var id = 1//req.get('android_id');
	//chofer.findbyId(id);
});


router.get('/:id', function(req,res){ //envío clave al teléfono id s
	//var android = req.get("android_id");
	res.render(chofer.findbyTel(req.params.id).resolve());
});


router.post('/', function(req,res){ //envío clave al teléfono id s
	var telefono = req.body.Tel;
	var nombre = req.body.Nombre;
	chofer.add(nombre,telefono);
});
module.exports = router;