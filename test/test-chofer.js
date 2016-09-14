var Promise = require("bluebird");
var db = require('../model/db.js');
var chai = require('chai')
, chaiHttp = require('chai-http');
var expect = chai.expect; 
chai.use(chaiHttp);
var express = require('express');
var app = 'localhost:3000';
var mysql = require('mysql');

Promise.promisifyAll(chai);
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'test'
});

db.init();
connection.query('CREATE database if not exists test');
connection.query('CREATE TABLE IF NOT EXISTS chofer (android_id varchar(50), tel int primary key, nombre varchar(50), claveSMS int)');
connection.query('TRUNCATE TABLE chofer;');
connection.query("insert into chofer (nombre, tel, claveSMS) values ('matias', '11223344', '4321')");
connection.query("insert into chofer(nombre,tel, claveSMS, android_id) values ('mastropiero' , '12341234', '1234','1122')");

console.log('db inicializada');

it('chofer existente', function(done) { 
	chai.request(app)
	.get('/chofer/1122')
	.end(function (err, res) {
		expect(res).to.have.status(200);
	});
	done();                               
});

it('creo nuevo chofer', function(done) { 
	chai.request(app)
	.post('/chofer').send({ telefono: '123', nombre: 'El quique' })
	.end(function (err, res) {
		expect(res).to.have.status(200);
	});
	done();                               
});


it('solicito el android_id 4321 y no devuelve porque todavía no lo validaron', function(done) { 
	chai.request(app)
	.get('/chofer/4321')
	.end(function (err, res) {
		expect(res).to.have.status(410);
	});      
	done();
});

it('envio clave recibida por SMS y le asigno android_id 1234, después lo solicito', function(done) { 
	chai.request(app)
	.put('/chofer/4321').send({ tel: '11223344', claveSMS: '4321'})
	.end(function (err, res) {
		expect(res).to.have.status(200);
	})
	chai.request(app)
	.get('/chofer/4321')
	.end(function (err, res) {
		expect(res).to.have.status(200);
	}); 
	done(); 
});



