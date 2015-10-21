// sudo node basic.js

var Cap = require('cap').Cap
var dec = require('cap').decoders
var PROTOCOL = dec.PROTOCOL

var c = new Cap()
var d = Cap.findDevice('192.168.1.100') // "eth0"
var f = 'tcp and dst port 80'
var bs = 10*1024*1024
var buffer = new Buffer(65535)

console.log('d',d)

var lt = c.open(d,f,bs,buffer)

c.setMinBytes && c.setMinBytes(0)

c.on('packet',function(nb,trunked){
	console.log(nb,trunked?'partial':'full',buffer)

	var r = dec.Ethernet(buffer)
	console.log(r)
	})
