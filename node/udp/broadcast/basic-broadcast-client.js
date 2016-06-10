//
// basic client (transmitter)
//

const dgram = require('dgram')
const client  = dgram.createSocket('udp4')

const message = Buffer.from('hello!')


client.bind((err)=>{
	console.log('bind',err)

	var i = client.address()
	console.log('address',i)

	client.setBroadcast(true) // allow broadcast address -- must be bound first?

	client.send(message,1234,'192.168.2.255',(err)=>{
		console.log('send result',err)
		})//func

	})//func

