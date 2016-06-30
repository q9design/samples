//
// ping -- transceiver
//

// upg: if not hearback, try again 1 sec.

const dgram = require('dgram')
const udp = dgram.createSocket('udp4')
const now = require('performance-now')
const numeral = require('numeral')

var remote_host = 'localhost'
var remote_port = 12345


var overhead = []
var readings = []
var tick = n=>{ // upgrade .. do performance diff aver
	var n = now()
	var nn = now()
	overhead.push((nn-n)/1000)
	var message = Buffer.from(JSON.stringify({ping:now(),x:'012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'}))
	udp.send(message,remote_port,remote_host,err=>{if(err)console.log('sent',err)})
	}


udp.on('message',(msg,rinfo)=>{
	// Tested 32 Micro Seconds overhead.
	var nn = now()
	var m = JSON.parse(msg.toString())

//	console.log(`message event: ${msg}`,m,rinfo)
	
	if(m.ping){
		var reply = Buffer.from(JSON.stringify({pong:m}))
		udp.send(reply,rinfo.port,rinfo.address,err=>{if(err) console.log('sent',err)})
		}//if
	else
	if(m.pong){
		var d = (nn-m.pong.ping)
		var dd = (1/((d==0)?1:d))*1000
		readings.push(d)
		console.log('PONG',numeral(d).format('0.000000')+'ms',' --- ',numeral(dd).format('0,0')+"hz")

		setTimeout(tick,1000)
		}//if
	})//func

udp.bind(12345,err=>{
	console.log('bound',err)
	tick()	

	}) // 0.0.0.0:12345


