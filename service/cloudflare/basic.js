const fs = require('fs')
const request = require('request')
const Hjson = require('hjson')

var config = Hjson.parse(fs.readFileSync(fs.readFileSync('config.txt').toString().trim()).toString()) // upg: use 

var apiKey = config.apiKey
var email = config.email
var baseURL = 'https://api.cloudflare.com/client/v4'
console.log('config',email,apiKey,baseURL)



var uri = `${baseURL}/user`
request({
	method: 'GET',
	headers: {
		'X-Auth-Email': email,
		'X-Auth-Key': apiKey,
		'Content-Type': 'application/json'
		},
	uri,
	},(err,resp,body)=>{
		if(!err){
			console.log(resp.statusMessage,resp.statusCode)
			var d = JSON.parse(body)
			console.log(d)
			}
		else
			console.log('err',err)
		})

/*
OK 200

{ result: 
   { id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
     email: 'example@example.com',
     username: 'example',
     first_name: null,
     last_name: null,
     telephone: null,
     country: null,
     zipcode: null,
     two_factor_authentication_enabled: false,
     two_factor_authentication_locked: false,
     created_on: '2012-11-21T20:29:15.551356Z',
     modified_on: '2014-12-22T11:08:42.485222Z',
     organizations: null,
     has_pro_zones: false,
     has_business_zones: false,
     has_enterprise_zones: false },
  success: true,
  errors: [],
  messages: [] }

*/
