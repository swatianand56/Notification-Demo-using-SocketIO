var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/wingify';

var getSenderDetails = function(notification, cb){

	mongoClient.connect(url, function(err, db){
		if(err){
			cb("Unable to connect to the DB", null);
		}
		else{
			var users = db.collection("users");
			var query = {};
			query["_id"] = notification.sender;
			users.find(query).limit(1).next(function(err, result){
				if(err){
					cb("Unable to fetch sender details", null);
				}
				else{
					if(result.name){
						notification["name"] = result.name;
					}

					if(result.profile){
						notification["profile"] = result.profile;
					}
				
					db.close();
					cb(null, notification);
					return;
				}
			});
		}
	});
}

exports.getSenderDetails = getSenderDetails;