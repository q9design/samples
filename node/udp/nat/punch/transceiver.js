//
// udp (transceiver)
//

// TUN does work with three types of NAT: full cone NAT, restricted cone NAT, and port restricted cone NAT. 

// https://en.wikipedia.org/wiki/UDP_hole_punching
// https://en.wikipedia.org/wiki/STUN


// A => [ ] <= B  ... when both try to send to correct WANIP:WANPORT .. once BOTH sides have tried.. packets flow .. cool!


// upg: provide a secret.

// upg: punch works. (get's data from remote server and back)

//upg: need to craft the from header as from the original rinfo server ip/port?

// next: try ice.

// upg: add colors (chalk npm)

// next: try two rinfo servers and see if get same port

// next: try connect two devices behand nat using same port... what/how does nat assign?

const fs = require('fs')
const Hjson = require('hjson')
const dns = require('dns')

const dgram = require('dgram')
const udp = dgram.createSocket('udp4')
const prompt = require('prompt')

var config
var waiting_addr = []
var echo = Math.random() //use better random

//upg: convert host to ip .. then use ip to send. (so can verify on reply)

//upg: encrypted data only we can decrypt the echo.? .. signed by server? -- but hmm.. simple solution?

// ----------------------
fs.readFile('config.hjson',(err,data)=>{
	config = Hjson.parse(data.toString())

	console.log('config',config)


	// -----------------------
	udp.on('message',(msg,rinfo)=>{
		console.log(`msg: ${msg}`,rinfo)

		try{
			var m  = JSON.parse(msg.toString())

			//if(fromrequstserver){}
			if(true){ // check from addr and echo
				var public_address = m.address
				var public_port = m.port
				console.log('hailing from',public_address,public_port)
				//upg: fun.. auto map to dyndns at this point?

				prompt.start()
				prompt.get(['host','port'],(err,result)=>{
					console.log(err,result)


					var message = Buffer.from('hello!! '+new Date())
	
					var tick = n=>{
						var port = parseInt(result.port)
						var host = result.host
						console.log('sending',message,host,':',port)
						udp.send(message,port,host,(err)=>{
							console.log('sent',err)
							setTimeout(tick,2500)
							})
						}

					tick()
					})
				

				}//if
		}//try
		catch(e){
			console.log('message not json?',msg,msg.toString(),new Date())
			}//catch

		})//func
		

	// ---------------
	udp.bind((err)=>{
		console.log('bind',err)

		console.log("localy i'm",udp.address())

		var punch_host = config.punch_host

		var message = Buffer.from(''+echo)

		dns.lookup(punch_host,(err,addr,fam)=>{

			console.log('dnslookup',err,addr,fam)
			waiting_addr.push(addr)

			udp.send(message,config.punch_port,addr,(err)=>{ // upg: continue to send every sec (with back off?) till we have our anwser?
				console.log('send result',err)
				})
			})//func

		}) // bind: 0.0.0.0:1234

	

	})//func



/*
{ address: '256.14.34.129',
  family: 'IPv4',
  port: 12345,
  size: 6,
  echo: '0.31206638813302656'
}
*/
