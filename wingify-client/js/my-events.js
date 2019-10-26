$('#notifications').on('shown.bs.collapse', function() {
	markAsRead();
});

$(document).click(function(e){
	if(!$("#notifications").is(e.target) && $("#notifications").has(e.target).length === 0){
		$("#notifications").collapse("hide");
	}
});

$("#notifications-msgs").bind('scroll', function(e){
	if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){
		var numNotifications = $("#notifications-msgs").children(".notification").length;
		loadMoreNotifications(numNotifications);
	}
});
