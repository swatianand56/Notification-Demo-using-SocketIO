var http = require("http");
var server = http.createServer();
var notificationController = require("./controllers/notifications.js");

var io = require("socket.io")(server);

io.on("connection", function(socket){
	console.log("connection established");
	//When connected load the notifications from the server
	var skipVal = 0;
	notificationController.loadOldNotifications(0, function(err, res){
		if(err){
			console.log(err);
		}
		else{
			socket.emit("old-notification", res);
		}
	});
	
	//On regular intervals emit notifications
	var interval = setInterval(function () {
		
		notificationController.generateRandomNotification(function(err, res){
			if(err){
				console.log(err);
			}
			else{
				socket.emit("new-notification", res);
			}
		});
    }, 10000); 

    
	socket.on("load-more-notifications", function(skipVal){
		
		notificationController.loadOldNotifications(skipVal, function(err, res){
			if(err){
				console.log(err);
			}
			else{
				socket.emit("old-notification", res);
			}
		});	
	});

	socket.on("mark-read", function(ids){

		notificationController.markNotificationAsRead(ids, function(err, res){
			if(err){
				console.log(err);
			}
			else{
				console.log(res);
			}
		});
	});
	
	socket.on("disconnect", function () {
        clearInterval(interval);
    });

});

server.listen(3000);
console.log("Server is listening");