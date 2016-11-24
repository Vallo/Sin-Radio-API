var express = require('express');
var router = express.Router();	
var notifications = require('../helper/notifications.js');
var requestify = require('requestify');
var chofer = require('../model/chofer.js');
var db = require('../model/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Sin - Radio' });
});

router.get('/test', function(req,res){
	//notifications.sendNotification('dpDOi1Uz02I:APA91bGWad_RjxbF6qE1sGtudoWVR60AvbJanOiHJ4aflARZ7-py3sRtgSzk8lbg4p2VG1_yp2oED3AVGqx_aT_xR-PAgBSzoAOb5t_tjibwGd4riDiW3Xu5Pf5yXaClOJlh7G1YNyWf', {"diego":"gay"}, "Diegooooooooooooteee","dale que so vo");
	requestify.post('http://api.sin-radio.com.ar/viaje', {"lat":"-34.636", "lon":"-58.49509", "dir":"Marcos Calvo 1231"});
	res.sendStatus(200);
});

router.get('/test2', function(req,res){
	chofer.findbyTel(1131154958).then(function(result){//
		chofer.getToken(result.android_id).then(function(token){
			console.log(result);
			notifications.sendNotification(token.token, {"idViaje":1,"dir":"Marcos Calvo 1231", "lat":"-34.636", "lon":"-58.49509", "title":"Nuevo Viaje!", "body":"Marcos Calvo 1231"},null,null);
		})
	});

	res.sendStatus(200);
});

router.get('/test3', function(req,res){
	notifications.sendNotificationPasajero('erAaBVulPLQ:APA91bEQJTrRv64XH5o2XnW0qNs2CUxCkrFQCd--b7DRjCeCjT4KVVK8JB-joE4yxAOilZ6gZxY8US0lVEJMlmNnpwHVJSShGfSaHq1LIxv2WzJ_jqXmf4xlqUlD7qXSGgnpr6TpCYX2', {"title":"Su chofer ha arribado!","body":"Patente: ABC-123"});
	res.sendStatus(200);
});

router.get('/test4', function(req,res){
	requestify.post('http://45.55.85.27/alertaVial',{"desc":"Corte total en Cabildo y Juramento"});
	res.sendStatus(200);
});

router.get('/Init', function(req,res){
	db.reset().then(function(){
		res.send('NUBE INICIALIZADA');
	});
});
	module.exports = router; 
