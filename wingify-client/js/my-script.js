
function addNotification(notification, front){

	var newDiv = '<div class="notification '+notification.status+'" id="'+notification._id+'"><div class="row"><div class="col-lg-3"><img src="'+notification.profile;
	newDiv = newDiv + '" class="img-responsive img-circle"/></div><div class="col-lg-9 n-msg"><span class="name">'+notification.name;
	newDiv = newDiv + ' </span>'+ notification.msg;
	newDiv = newDiv + '</div></div></div>';
	if(front){
		$("#notifications-msgs").prepend(newDiv);
	}
	else{
		$("#notifications-msgs").append(newDiv);
	}

	if(notification.status == "unread"){
		var numUnread = Number($(".num-unread").html());
		$(".num-unread").html(numUnread+1);
	}

	if(!$("#bell-icon").hasClass("collapsed")){
		markAsRead();
	}
}

function markAsRead(){
	var unreadids = [];

	$("#notifications-msgs").children(".unread").each(function(){
		var id = $(this).attr("id");
		$(this).addClass("read");
		$(this).removeClass("unread");
		unreadids.push(id);
	});

	if($(".num-unread").html()!="0"){
		socket.emit("mark-read", unreadids);
		//Change the number of notifications
		setTimeout(function(){
			$(".num-unread").html("0");
		}, 1000);
	}
}


