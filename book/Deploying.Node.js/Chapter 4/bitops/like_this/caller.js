function like() {
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:8080/like', true);
	
	xhr.onload = function() {
		var response = xhr.responseText;

		if(!$("#panel-container").length) {
			$(document.body).prepend('\
				<div id="panel-container">\
					<div id="bitops-count"></div>\
				</div>');
		} 
		
		$("#bitops-count")
			.html('<div id="bitops-message">This page has been liked <b>' + xhr.responseText + '</b> times today!</div>');
			
		$("#panel-container")
			.slideDown(500)

		
	};
	
	xhr.onerror = function() {
		alert('network error');
		// do something on network errors
		//
	};
	
	xhr.send(document.location.href);
}
