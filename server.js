var http = require("http");
var url = require("url");

function start(route, handler) {
	var onRequest = function(req, res) {
		route(handler, req, res);	
	};
	http.createServer(onRequest).listen(8000);
	console.log("server started.");
}
exports.start = start;

