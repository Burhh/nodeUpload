var server = require('./server.js');
var router = require('./router.js');
var requestHandler = require('./requestHandler');

var handler = {
	'/': requestHandler.start,
	'/upload': requestHandler.upload,
	'onload': requestHandler.onload,
	'show404': requestHandler.show404
};

server.start(router.route, handler);