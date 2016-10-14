var FCM = require('fcm-push');
var req = require('requestify');
//var serverKey = '';
var fcm = new FCM('AIzaSyA4dgGcZCKT8sJyUaE_bRVVljjLM9PeQnA');



exports.sendNotification = function(to, data_, title_, body_){
	var message = {
		to: to, // required fill with device token or topics
		collapse_key: 'test',
		data: data_,
		notification: {
			title: title_,
			body: body_
		}
	};
	console.log(message);
	fcm.send(message)
		.then(function(response){
		})
		.catch(function(err){
			console.log("Something has gone wrong!");
			console.error(err);
		});
};