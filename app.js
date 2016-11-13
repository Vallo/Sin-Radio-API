var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./model/db.js');
var routes = require('./routes/index');
var chofer = require('./routes/chofer');
var posicion = require('./routes/posicion');
var cliente = require('./routes/cliente');
var viaje = require('./routes/viajes');
var alertaVial = require('./routes/alertaVial.js');
var cors = require('cors');
var sync = require('./routes/sync')
var app = express();

console.log('SERVER ON');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', routes);
app.use('/chofer', chofer);
app.use('/posicion', posicion);
app.use('/viaje', viaje);
app.use('/cliente', cliente);
app.use('/sync',sync);
app.use('/alertaVial',alertaVial);
db.init();
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/reset', function(req,res){
	db.query('drop database test').then(function(){
		db.query('create database test').then(function(){
			db.query("create user 'Diego'@'%' identified by 'cfk2019'");
			db.query("create user 'test'@'%' identified by '1234'");
			db.query("grant all privileges to 'Diego'@'%'");
			db.query("grant all privileges to 'test'@'%'");
			db.query("flush privileges");
			db.init();
		});
	});
});

module.exports = router;

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
