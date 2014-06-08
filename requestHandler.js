var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var sys = require('sys');

function start(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.createReadStream('./index.html').pipe(res);
};

function upload(req, res) {
	form = new formidable.IncomingForm();
		 	form.parse(req, function(err, fields, files) {
        var length = Object.getOwnPropertyNames(files).length;
          while(length--) {
            console.log("upload" + __dirname + '/img/' + files[length].name);
            fs.rename(files[length].path, __dirname + '/img/' + files[length].name);
          }
			    res.writeHead(200, {'content-type': 'text/plain'});
          res.end("upload success.");
		  });	
};

function show404(req, res) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write('404 error');
  res.end();
};

function onload(req, res) {
  res.writeHead(200, {"Content-Type": typeJudge(req.url)});
  fs.createReadStream(__dirname + req.url).pipe(res);
}

function typeJudge(url) {
  var contentType = '';
  var ext = path.extname(url);

  switch(ext) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    default:
      contentType = 'text/html';
  }
  return contentType;
}

exports.start = start;
exports.upload = upload;
exports.show404 = show404;
exports.onload = onload;