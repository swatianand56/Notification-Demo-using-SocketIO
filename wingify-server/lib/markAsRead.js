var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/wingify';
var ObjectId = mongodb.ObjectId;

var markAsRead = function(ids, cb){

	mongoClient.connect(url, function(err, db){
		if(err){
			cb("Unable to connect to the DB", null);
		}
		else{
			var notifications = db.collection("notifications");
			var query = {};
			var inquery = {};
			var x = new ObjectId(ids[0]);
			var idArray = [];
			console.log(x);
			for(var i = 0; i < ids.length; i++){
				console.log("converting to ObjectId");
				ids[i] = new ObjectId(ids[i]); 
			}
			inquery["$in"] = ids;
			query["_id"] = inquery;
			notifications.update(query, {"$set": {"status" : "read"}}, {"multi": true}, function(err, res){
				if(err){
					cb("Error while marking notifications as read", null);
				}
				else{
					cb(null, res);
				}
			});
		}
	});
}

exports.markAsRead = markAsRead;