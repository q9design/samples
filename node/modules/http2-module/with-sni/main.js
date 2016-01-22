var fs  = require('fs')
var tls = require('tls')

var config = JSON.parse(fs.readFileSync('config.json').toString())

// upg: cache contexts in memory as create them.

var options = {
	key: fs.readFileSync(config.key),
	cert: fs.readFileSync(config.cert),
	SNICallback: (n,cb) =>{
		console.log('server name',n) // use server name to select proper cert.
		var ctx = tls.createSecureContext({
			key: fs.readFileSync(config.key),
			cert: fs.readFileSync(config.cert)})
		cb(null,ctx)
		}
};


console.log(config)
var port = 4433

console.log('server on port',port)
require('http2').createServer(options, function(request, response) {
	console.log('.')
	response.end('Hello world!');
}).listen(port);

