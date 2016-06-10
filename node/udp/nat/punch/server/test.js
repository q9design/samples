//
// basic client (transmitter)
//

const dgram = require('dgram')
const client  = dgram.createSocket('udp4')

const message = Buffer.from('hello!')

var port = 12345
var ip = 'localhost'


client.bind(19302,err=>{
	
	console.log('bind',err)
	console.log(client.address())

	var tick = n=>{

		client.send(message,port,ip,(err)=>{
			console.log('send result',err)
			setTimeout(tick,500)
			})

		}//func

	tick()

	})


