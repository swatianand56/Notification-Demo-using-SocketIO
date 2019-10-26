var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/wingify';

var getNotifications = function(skipVal, cb){

	mongoClient.connect(url, function(err, db){
		if(err){
			cb("Unable to connect to the DB", null);
		}
		else{
			var notifications = db.collection("notifications");
			notifications.find().sort({"_id": -1}).skip(skipVal).limit(5).toArray(function(err, result){
				db.close();	
				if(err){
					cb("Error while getting notifications", null);
				}
				else{
					cb(null, result);
				}
			});
		}
	});
}

exports.getNotifications = getNotifications;