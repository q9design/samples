//
// basic client (transmitter)
//

const dgram = require('dgram')
const client  = dgram.createSocket('udp4')


var i = 1;
var buffer = Buffer.alloc(65507) // 65507 on local host 

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


