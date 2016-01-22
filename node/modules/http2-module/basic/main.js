var fs  = require('fs')

var config = JSON.parse(fs.readFileSync('config.json').toString())

var options = {
  key: fs.readFileSync(config.key),
  cert: fs.readFileSync(config.cert)
};


console.log(config)
var port = 4433

console.log('server on port',port)
require('http2').createServer(options, function(request, response) {
	console.log('.')
	response.end('Hello world!');
}).listen(port);

