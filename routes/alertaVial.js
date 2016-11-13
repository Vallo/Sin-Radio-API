var express = require('express');
var router = express.Router();	
var chofer = require('../model/chofer.js');
var notifications = require('../helper/notifications.js');

router.post('/', function(req,res){
	var desc = req.get('desc');
	chofer.findAll().then(function(chof){
		for (var i = 0; i < chof.length; i++) {
			chofer.getToken(chof[i].android_id).then(function(tok){
				notifications.sendNotification(tok, {title: 'Alerta vial!' , body: desc})
			})
			
		}
	});
});


module.exports = router;