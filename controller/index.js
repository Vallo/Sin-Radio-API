var express = require('express');
var router = express.Router();	


/*router.get('/chofer', function(req,res){
		console.log('ok');
		res.render('2');
});*/

router.use('/chofer', require('./chofer'));	

module.exports = router;