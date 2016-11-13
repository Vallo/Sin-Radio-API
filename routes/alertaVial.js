var express = require('express');
var router = express.Router();	
var notifications = require('../helper/notifications.js');

router.post('/', function(req,res){
	var desc = req.get('desc');
	chofer.findAll().then(function(chof){
		for (var i = 0; i < chof.length; i++) {
			notifications.sendNotification(chof[i].token, {title: 'Alerta vial!' , body: desc})
		}
	});
});


module.exports = router;