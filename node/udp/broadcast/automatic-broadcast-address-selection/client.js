//
// 2016.06.10 detact broadcast address (transmitter)
//

// upg: choice to send to all/specific adatpers/families/etc


// see also: npm ip / node-ip

const os = require('os')
const ip = require('ip')

const dgram = require('dgram')


////////////////////////////////////////////
// detect addresses

var l = os.networkInterfaces()
var ll = []

for(var i in l){
	var v = l[i]
	var r = []
	v.forEach(vv=>{
		var a = vv.address
		var f = vv.family
		var n = vv.netmask
		var rr = ip.subnet(a,n)
		rr.family = f
		rr.mac = vv.mac
		rr.internal = vv.internal
		rr.adapter = i
		//scope id?

		ll.push(rr)
		})//forEach
	}//for

//console.log('options',ll)


var bl = [] //boadcast list

// public ip4 addresses
ll.forEach(v=>{
	if(!v.internal && v.family == 'IPv4')
		bl.push(v.broadcastAddress)
	})

//console.log('broadcast list',bl)

/////////////////////////////////////////////






////////////////////////////////////////////////
// send

const client  = dgram.createSocket('udp4')
const message = Buffer.from('hello!')


var to_addr = bl[0] // upg: could loop and send to all

console.log('broadcast to',to_addr)

client.bind((err)=>{
	console.log('bind',err)

	client.setBroadcast(true) // allow broadcast address -- must be bound first?

	client.send(message,1234,to_addr,(err)=>{
		console.log('send result',err)
		client.close()
		})//func

	})//func

//////////////////////////////////////////////

/*

options [ { networkAddress: '127.0.0.0',
    firstAddress: '127.0.0.1',
    lastAddress: '127.255.255.254',
    broadcastAddress: '127.255.255.255',
    subnetMask: '255.0.0.0',
    subnetMaskLength: 8,
    numHosts: 16777214,
    length: 16777216,
    contains: [Function],
    family: 'IPv4',
    mac: '00:00:00:00:00:00',
    internal: true,
    adapter: 'lo' },
  { networkAddress: '0.0.0.0',
    firstAddress: '0.0.0.0',
    lastAddress: '255.255.255.255',
    broadcastAddress: '255.255.255.255',
    subnetMask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
    subnetMaskLength: 128,
    numHosts: 1.262177448353619e-29,
    length: 1.262177448353619e-29,
    contains: [Function],
    family: 'IPv6',
    mac: '00:00:00:00:00:00',
    internal: true,
    adapter: 'lo' },
  { networkAddress: '192.168.2.0',
    firstAddress: '192.168.2.1',
    lastAddress: '192.168.2.254',
    broadcastAddress: '192.168.2.255',
    subnetMask: '255.255.255.0',
    subnetMaskLength: 24,
    numHosts: 254,
    length: 256,
    contains: [Function],
    family: 'IPv4',
    mac: 'xx:yy:zz:aa:a3:ba',
    internal: false,
    adapter: 'enp10s0' },
  { networkAddress: '0.0.0.0',
    firstAddress: '0.0.0.0',
    lastAddress: '0.0.0.0',
    broadcastAddress: '0.0.0.0',
    subnetMask: 'ffff:ffff:ffff:ffff::',
    subnetMaskLength: 64,
    numHosts: 2.3283064365386963e-10,
    length: 2.3283064365386963e-10,
    contains: [Function],
    family: 'IPv6',
    mac: 'xx:yy:zz:aa:a3:ba',
    internal: false,
    adapter: 'enp10s0' } ]


broadcast list [ '192.168.2.255' ]

*/


