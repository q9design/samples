//
// udp (transceiver)
//

// next: learn stun protocol?
//	see ice stun/turn

// TUN does work with three types of NAT: full cone NAT, restricted cone NAT, and port restricted cone NAT. 

// https://en.wikipedia.org/wiki/UDP_hole_punching
// https://en.wikipedia.org/wiki/STUN

const fs = require('fs')
const Hjson = require('hjson')
const stun = require('stun')

//const dgram = require('dgram')
//const udp = dgram.createSocket('udp4')

var config

fs.readFile('config.hjson',(err,data)=>{
	config = Hjson.parse(data.toString())
	})


var sc = stun.connect(19302,'stun.l.example.com')
var sc2 = stun.connect(19302,'stun.l.example.com')


sc.on('error',(err)=>{
	console.log('eerrr',err)
	})

sc.on('response',(packet)=>{
	console.log('response',packet)
	})

sc.on('message',(msg,rinfo)=>{
	console.log('message',msg,rinfo)
	})

sc.request((a,b,c)=>{
	console.log('request',a,b,c)
	})


