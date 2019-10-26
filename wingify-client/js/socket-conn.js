var socket = io.connect("http://localhost:3000");   //By default tries to connect to the host that serves the page
socket.on("connect", function () {  
    console.log("Connected!");
});

socket.on("new-notification", function(notification){
	addNotification(notification, true);
});

socket.on("old-notification", function(notification){
	addNotification(notification, false);
});

function loadMoreNotifications(skipVal){
	socket.emit("load-more-notifications", skipVal);
}