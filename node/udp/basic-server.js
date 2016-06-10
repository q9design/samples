//
// server (receiver)
//

const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('message',(msg,rinfo)=>{
	console.log(`msg: ${msg}`,rinfo)
	})

server.bind(1234) // 0.0.0.0:1234


