//
// server (receiver)
//

const dgram = require('dgram')
const server = dgram.createSocket('udp4')

var max = 0
server.on('message',(msg,rinfo)=>{
	console.log(rinfo)
	var size = rinfo.size
	if(size > max){
		max = size
		console.log("max!",max)
		}
		
	})

server.bind(1234) // 0.0.0.0:1234


