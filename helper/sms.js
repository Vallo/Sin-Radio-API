var http = require('http');
var requestify = require('requestify'); 
exports.sendSms = function(tel, clave){

  var url = '/api/0.2/?alias=Sin_Radio&apikey=2a868f9e96f2afb7444c21fbb5dd0651&num=' + tel + '&msj=Su%20clave%20es%20' + clave;
  requestify.get('https://www.smsc.com.ar' + url).then(function(response) {
    response.getBody();
    console.log('mande SMS a ' + tel);
    console.log(response.body);
  }).catch(function(error){
  	console.log('algo explotó enviando SMS: ' + error);
  });
}