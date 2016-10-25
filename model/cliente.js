var db = require('./db.js');


exports.upsertToken = function(id,token){
	return db.query("insert into TOKENS (CLIENTE, TOKEN) values (?,?) on duplicate key update token = values(token);", [id, token]).then(function(result){
		return result[0];
	});
};