//
// udp UDP hole punching -- public server
//

// TUN does work with three types of NAT: full cone NAT, restricted cone NAT, and port restricted cone NAT. 

// https://en.wikipedia.org/wiki/UDP_hole_punching
// https://en.wikipedia.org/wiki/STUN

// upg: could use internal port mapped server? via dyndns

// don't run as root.

// upg: secret key? // encryption? hmmm..

// upg: other security review

const fs = require('fs')
const Hjson = require('hjson')

const dgram = require('dgram')
const udp = dgram.createSocket('udp4')

var config

fs.readFile('server-config.hjson',(err,data)=>{
	config = Hjson.parse(data.toString())

	console.log('using',config)


	udp.on('message',(msg,rinfo)=>{
		console.log(`msg: ${msg}`,rinfo)

		// echo reply
		//var r = {type:'rinfo',value:rinfo} // can filter via the from
		var r = rinfo
		r.echo = msg.toString()
		var reply = Buffer.from(JSON.stringify(r))
		udp.send(reply,rinfo.port,rinfo.address,(err)=>{
			console.log('reply result',err)
			})
		})

	udp.bind(parseInt(config.port),config.bind_addr,(err)=>{
		console.log('bind',err)

		}) // 0.0.0.0:19302

	})




