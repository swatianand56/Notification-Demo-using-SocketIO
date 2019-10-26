var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/wingify';
var ObjectId = mongodb.ObjectId;

var addNotifications = function(notification, cb){

	mongoClient.connect(url, function(err, db){
		if(err){
			cb("Unable to connect to the DB", null);
		}
		else{
			var notifications = db.collection("notifications");
			notification["_id"] = new ObjectId();
			notifications.insertOne(notification, function(err, result){
				if(err){
					cb("Error while inserting notification", null);
				}
				else{
					cb(null, "Notification successfully inserted");
				}
				db.close();
			});
		}
	});
}

exports.addNotifications = addNotifications;