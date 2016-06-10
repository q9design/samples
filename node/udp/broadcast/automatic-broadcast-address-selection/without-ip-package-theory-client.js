//
// 2016.06.10 (transmitter)
//

// note: this sample is incomplete.


// see also: npm ip / node-ip

const os = require('os')

const dgram = require('dgram')
const client  = dgram.createSocket('udp4')

const message = Buffer.from('hello!')


var l = os.networkInterfaces()
var ll = {}

for(var i in l){
	var v = l[i]
	var r = []
	v.forEach(vv=>{
		var a = vv.address
		var f = vv.family
		var n = vv.netmask
		r.push({broadcast:'invert netmask then or with address',a,n}) // see npm ip : ip.subnet(address, netmask)
		})//forEach
	ll[i] = r
	}//for


console.log('ll',ll)

client.bind((err)=>{
	console.log('bind',err)

	var i = client.address()
	console.log('address',i)

	client.setBroadcast(true) // allow broadcast address -- must be bound first?

	client.send(message,1234,'192.168.2.255',(err)=>{
		console.log('send result',err)
		client.close()
		})//func

	})//func


/*
var l = os.networkInterfaces()

{ lo: 
   [ { address: '127.0.0.1',
       netmask: '255.0.0.0',
       family: 'IPv4',
       mac: '00:00:00:00:00:00',
       internal: true },
     { address: '::1',
       netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
       family: 'IPv6',
       mac: '00:00:00:00:00:00',
       scopeid: 0,
       internal: true } ],
  enp10s0: 
   [ { address: '192.168.1.101',
       netmask: '255.255.255.0',
       family: 'IPv4',
       mac: 'hh:c3:7b:9b:ff:ea',
       internal: false },
     { address: 'fe80::1aqa:f41a:f1z1:dq5b',
       netmask: 'ffff:ffff:ffff:ffff::',
       family: 'IPv6',
       mac: 'hh:c3:7b:9b:ff:ea',
       scopeid: 2,
       internal: false } ] }
*/
