var express = require('express');
var router = express.Router();	
var notifications = require('../helper/notifications.js');
var requestify = require('requestify');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sin - Radio' });
});

router.get('/test', function(req,res){
	//notifications.sendNotification('dpDOi1Uz02I:APA91bGWad_RjxbF6qE1sGtudoWVR60AvbJanOiHJ4aflARZ7-py3sRtgSzk8lbg4p2VG1_yp2oED3AVGqx_aT_xR-PAgBSzoAOb5t_tjibwGd4riDiW3Xu5Pf5yXaClOJlh7G1YNyWf', {"diego":"gay"}, "Diegooooooooooooteee","dale que so vo");
	requestify.post('http://api.sin-radio.com.ar/viaje', {"lat":"-34.636", "lon":"-58.49509", "dir":"Marcos Calvo 1231"});
	res.sendStatus(200);
});

module.exports = router; 