//
// server (receiver)
//

const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('message',(msg,rinfo)=>{
	console.log(`msg: ${msg}`,rinfo)
	})

server.bind(1234,'192.168.2.255',(err)=>{ // broadcast address = inverted netmask MATH_OR with address
	console.log('bind',err)
	}) // broadcast:1234


