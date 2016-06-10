//
// basic client (transmitter) -- test packetsize sendable
//


// next: tool to detect MTU via avoid fragmanatation

//
// data can be sent up to about 65507 (MAX - (20+9)) but might be fragmented at network packet level.  Try to keep as close to fit in a single frame MTU.
// 

const dgram = require('dgram')
const client  = dgram.createSocket('udp4')


var i = 1;
var buffer = Buffer.alloc(65507) // 65507 on local host // 25004 on wireless? .. 1472 bytes recomended? (to avoid udp fragmentation)

var max = buffer.byteLength

var tick = n=>{
	if(i<=max){


		client.send(buffer,0,i,1234,'localhost',(err)=>{

			console.log('send result',i,err)

			i++
			setTimeout(tick,0)
			})

		}//if
	}//func

tick()


