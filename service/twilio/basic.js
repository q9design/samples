const Hjson = require('hjson')
const fs = require('fs')
const request = require('request')

var config = Hjson.parse(fs.readFileSync(fs.readFileSync('config.txt').toString().trim()).toString())
console.log('settings',config)

var accountSid = config.accountsid
var authToken = config.authtoken
var baseurl = config.baseurl


var uri = `${baseurl}/Accounts/${accountSid}/AvailablePhoneNumbers/US/TollFree.json`
request({
	method: 'GET',
	auth: {user:accountSid, pass: authToken},
	uri,
	},(err,rep,body)=>{
		console.log(err,rep+"",body)
		console.log("uri'",uri)
		})


