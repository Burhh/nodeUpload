var url = require("url");
var fs = require("fs");

function route(handler, req, res) {
	if(typeof handler[req.url] == 'function') {
		handler[req.url](req, res);
	} else if(fs.existsSync(__dirname + req.url)) {
		console.log(req.url);
		handler['onload'](req, res);
	} else {
		handler['show404'](req, res);
	}
}

exports.route = route;
