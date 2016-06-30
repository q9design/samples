//
// server (receiver)
//

const dgram = require('dgram')
const server = dgram.createSocket('udp4') // {type:'udp4',reuseAddr:true}  // so can have multiple apps on same host.

server.on('message',(msg,rinfo)=>{
	console.log(`msg: ${msg}`,rinfo)
	})

server.bind(1234,'192.168.2.255',(err)=>{ // broadcast address = inverted netmask MATH_OR with address
	console.log('bind',err)
	}) // broadcast:1234


