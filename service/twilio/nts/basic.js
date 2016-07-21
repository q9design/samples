const Hjson = require('hjson')
const fs = require('fs')
const request = require('request')

var config = Hjson.parse(fs.readFileSync(fs.readFileSync('../config.txt').toString().trim()).toString())
console.log('settings',config)

var accountSid = config.accountsid
var authToken = config.authtoken
var baseurl = config.baseurl


var uri = `${baseurl}/Accounts/${accountSid}/Tokens.json`
console.log("uri'",uri)

request({
	method: 'POST',
	auth: {user:accountSid, pass: authToken},
	uri,
	},(err,rep,body)=>{
		var r = JSON.parse(body)
		console.log(err,r)
		})

/*

 '{"username": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "password": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=", "account_sid": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "ttl": "86400", "ice_servers": [{"url": "stun:global.stun.twilio.com:3478?transport=udp"}, {"url": "turn:global.turn.twilio.com:3478?transport=udp", "username": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "credential": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx="}, {"url": "turn:global.turn.twilio.com:3478?transport=tcp", "username": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "credential": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx="}, {"url": "turn:global.turn.twilio.com:443?transport=tcp", "username": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "credential": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx="}], "date_created": "Thu, 21 Jul 2016 00:34:27 +0000", "date_updated": "Thu, 21 Jul 2016 00:34:27 +0000"}'



{ username: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  password: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=',
  account_sid: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  ttl: '86400',
  ice_servers: 
   [ { url: 'stun:global.stun.twilio.com:3478?transport=udp' },
     { url: 'turn:global.turn.twilio.com:3478?transport=udp',
       username: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
       credential: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=' },
     { url: 'turn:global.turn.twilio.com:3478?transport=tcp',
       username: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
       credential: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=' },
     { url: 'turn:global.turn.twilio.com:443?transport=tcp',
       username: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
       credential: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=' } ],
  date_created: 'Thu, 21 Jul 2016 00:35:33 +0000',
  date_updated: 'Thu, 21 Jul 2016 00:35:33 +0000' }

*/
