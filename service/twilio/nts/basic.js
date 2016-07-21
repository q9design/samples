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

 '{"username": "831a4a2921959e2c117b8ce21b589ec4ee20e7a07e669cc2dd13f147d5a7b8d9", "password": "y4kMWsz2PXR924UtYHRNIfm8z461EEzSKncZa12tBgw=", "account_sid": "ACa9889691caa924c7bd3416d13de2903a", "ttl": "86400", "ice_servers": [{"url": "stun:global.stun.twilio.com:3478?transport=udp"}, {"url": "turn:global.turn.twilio.com:3478?transport=udp", "username": "831a4a2921959e2c117b8ce21b589ec4ee20e7a07e669cc2dd13f147d5a7b8d9", "credential": "y4kMWsz2PXR924UtYHRNIfm8z461EEzSKncZa12tBgw="}, {"url": "turn:global.turn.twilio.com:3478?transport=tcp", "username": "831a4a2921959e2c117b8ce21b589ec4ee20e7a07e669cc2dd13f147d5a7b8d9", "credential": "y4kMWsz2PXR924UtYHRNIfm8z461EEzSKncZa12tBgw="}, {"url": "turn:global.turn.twilio.com:443?transport=tcp", "username": "831a4a2921959e2c117b8ce21b589ec4ee20e7a07e669cc2dd13f147d5a7b8d9", "credential": "y4kMWsz2PXR924UtYHRNIfm8z461EEzSKncZa12tBgw="}], "date_created": "Thu, 21 Jul 2016 00:34:27 +0000", "date_updated": "Thu, 21 Jul 2016 00:34:27 +0000"}'



{ username: '693f5cafa874569a506b1301d631ed5e17e8dcbf04f772cd429c4e51f2ade2fb',
  password: 'N3Pzvj601TwNe99YVuwNqW6TbBGLTtvEYocfBz8aMNU=',
  account_sid: 'ACa9889691caa924c7bd3416d13de2903a',
  ttl: '86400',
  ice_servers: 
   [ { url: 'stun:global.stun.twilio.com:3478?transport=udp' },
     { url: 'turn:global.turn.twilio.com:3478?transport=udp',
       username: '693f5cafa874569a506b1301d631ed5e17e8dcbf04f772cd429c4e51f2ade2fb',
       credential: 'N3Pzvj601TwNe99YVuwNqW6TbBGLTtvEYocfBz8aMNU=' },
     { url: 'turn:global.turn.twilio.com:3478?transport=tcp',
       username: '693f5cafa874569a506b1301d631ed5e17e8dcbf04f772cd429c4e51f2ade2fb',
       credential: 'N3Pzvj601TwNe99YVuwNqW6TbBGLTtvEYocfBz8aMNU=' },
     { url: 'turn:global.turn.twilio.com:443?transport=tcp',
       username: '693f5cafa874569a506b1301d631ed5e17e8dcbf04f772cd429c4e51f2ade2fb',
       credential: 'N3Pzvj601TwNe99YVuwNqW6TbBGLTtvEYocfBz8aMNU=' } ],
  date_created: 'Thu, 21 Jul 2016 00:35:33 +0000',
  date_updated: 'Thu, 21 Jul 2016 00:35:33 +0000' }

*/
