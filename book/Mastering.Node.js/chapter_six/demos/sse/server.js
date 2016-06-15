var http = require("http");
var fs = require("fs");
var url = require("url");

var UNIQUE_ID	= 1;
var USER_ID		= 1e10;

var clients		= {};
var clientQMap	= {};
var questions	= {};
var answers		= {};

var removeClient = function(id) {
	if(id) {
		delete clients[id];
		delete clientQMap[id];
	}
}

http.createServer(function(request, response) {

	var parsedURL 	= url.parse(request.url, true);
	var pathname 	= parsedURL.pathname;
	var args		= pathname.split("/");

	//	Lose initial null value
	//
	args.shift();
	
	var method 		= args.shift();
	var parameter 	= decodeURIComponent(args[0]);

	var sseUserId = request.headers['_sse_user_id_'];
  
	var broadcast = function(toId, msg, eventName) {
	
		if(toId === "*") {
			for(var p in clients) {
				broadcast(p, msg);
			}
			return;
		}
	
		var clientSocket = clients[toId];
		if(!clientSocket) {
			return;
		}
	
		eventName && clientSocket.write("event: " + eventName + "\n");
		clientSocket.write("id: " + (++UNIQUE_ID) + "\n");
		clientSocket.write("data: " + JSON.stringify(msg) + "\n\n");
	}  
  
  	if(method === "login") {

		response.writeHead(200, {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache"
		});
		
		response.write(":" + Array(2049).join(" ") + "\n"); // 2kB 
		response.write("retry: 2000\n");
				
		removeClient(sseUserId);
		
		//	A very simple id system. You'll need something more secure.
		//
		sseUserId = (USER_ID++).toString(36);

		clients[sseUserId] = response;

		broadcast(sseUserId, sseUserId, "login");
		
		broadcast(sseUserId, {
			type		: "questions",
			questions	: questions
		});

		response.on("close", function() {
			removeClient(sseUserId);
		});
		
		//	In order to keep the connection alive we send a "heartbeat" every 10 seconds.
		//	https://bugzilla.mozilla.org/show_bug.cgi?id=444328
		//
		setInterval(function() {
			broadcast(sseUserId, new Date().getTime(), "ping");
		}, 10000);
		
		return;
	}
	
	if(method === "askquestion") {

		//	Already asked?
		//
		if(questions[parameter]) {
			return response.end();
		}

		questions[parameter] = sseUserId;	
		
		broadcast("*", {
			type		: "questions",
			questions	: questions
		});
		
		return response.end();
	}
	
	if(method === "addanswer") {
	
		if(!parameter) {
			broadcast(sseUserId, {
				type	: "notification",
				message	: "Your answer is too short."
			});
			return response.end();
		}
	
		var curUserQuestion = clientQMap[sseUserId];
		if(!curUserQuestion) {
			broadcast(sseUserId, {
				type	: "notification",
				message	: "Please select a question to answer."
			});
			return response.end();
		}
		
		answers[curUserQuestion] = answers[curUserQuestion] || [];
		answers[curUserQuestion].push(parameter);
		
		//	Tell everyone watching this question
		//
		for(var id in clientQMap) {
			if(clientQMap[id] === curUserQuestion) {
				broadcast(id, {
					type		: "answers",
					question	: curUserQuestion,
					answers		: answers[curUserQuestion]
				});
			}
		}
		
		return response.end();
	}
	
	if(method === "selectquestion") {
		if(parameter && questions[parameter]) {
			clientQMap[sseUserId] = parameter;
			broadcast(sseUserId, {
				type		: "answers",
				question	: parameter,
				answers		: answers[parameter] ? answers[parameter] : []
			});
		}
		
		return response.end();
	}
	
	if(!method) {
		return fs.createReadStream('./index.html').pipe(response);
	} 

}).listen(2112);