//
// basic client (transmitter)
//

const dgram = require('dgram')
const client  = dgram.createSocket('udp4')

const message = Buffer.from('hello!')


client.send(message,1234,'localhost',(err)=>{
	console.log('send result',err)
	})

