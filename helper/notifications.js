//var FCM = require('fcm-push');

var serverKey = '';
var fcm //= new FCM(serverKey);

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
	fcm.send(message)
		.then(function(response){
			console.log("Successfully sent with response: ", response);
		})
		.catch(function(err){
			console.log("Something has gone wrong!");
			console.error(err);
		});
};