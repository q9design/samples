//
// simple/non data post.
//

var request = require('request')

var to = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

var b = { to // upg: from args or file.
	}

request({
	url: 'https://android.googleapis.com/gcm/send',
	method: 'post',
	headers: {
			'Authorization': 'key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'//,
			//"Content-Type" : "application/json" // automatially added by json: true
		},
	json: true,
	body: b
},function(err,res,body){
	console.log(err,body)
	})
