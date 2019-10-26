var notifications = require("../consts/notifications");
var addNotification = require("../lib/addNotification");
var getNotifications = require("../lib/getNotifications");
var getSenderDetails = require("../lib/getSenderDetails");
var markAsRead = require("../lib/markAsRead");

var loadOldNotifications = function(skipVal, cb){
	getNotifications.getNotifications(skipVal, function(err, res){
		if(err){
			cb("Error occured", null);
		}
		else{
			res.forEach(function(notification){
				getSenderDetails.getSenderDetails(notification, function(err, notif_with_sender){
					if(err){
						cb("Unable to fetch sender details", null);
					}
					else{
						cb(null, notif_with_sender);
					}
				});
			});
		}
	});
}

var generateRandomNotification = function(cb){
	var randomNumber = Math.floor((Math.random()*100)%12);
    var notification = notifications.notifications[randomNumber];

        //add to db and also emit
    addNotification.addNotifications(notification, function(err, msg){
       	if(err){
        	cb(err, null);
        }
        else{
        	getSenderDetails.getSenderDetails(notification, function(err, notification_with_sender){
        		cb(null, notification_with_sender);
        	});
        }
    });
}

var markNotificationAsRead = function(ids, cb){
	markAsRead.markAsRead(ids, function(err, res){
		if(err){
			cb(err, null);
		}
		else{
			cb(null, "Updation successful");
		}
	});
}

exports.loadOldNotifications = loadOldNotifications;
exports.generateRandomNotification = generateRandomNotification;
exports.markNotificationAsRead = markNotificationAsRead;