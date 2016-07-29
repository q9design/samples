//
// 2016.07.29
//
// A Zone is a domain name along with its subdomains and other identities
//

const util = require('util')
const fs = require('fs')
const request = require('request')
const Hjson = require('hjson')

var config = Hjson.parse(fs.readFileSync(fs.readFileSync('config.txt').toString().trim()).toString()) // upg: use 

var err = e=>console.log(e)

var apiKey = config.apiKey
var email = config.email
var domain = config.sampleDomain // domain.com
var baseURL = 'https://api.cloudflare.com/client/v4'
console.log('config',email,apiKey,baseURL)

var call = (method,uri,body)=>new Promise((res,rej)=>{
	//console.log('call',method,uri,body)

	request({
		method,
		headers: {
			'X-Auth-Email': email,
			'X-Auth-Key': apiKey,
			},
		json : true,
		body,
		uri,
		},(err,resp,data)=>{
			if(!err){
				res(data) // upg: include resp? {resp,data}
				}
			else
				rej(err) // upg: inlude all? {err,resp,data}
		})

	})


// https://api.cloudflare.com/#zone-list-zones
var uri = `${baseURL}/zones?name=${domain}`
console.log('request',uri)
request({
	method: 'GET',
	headers: {
		'X-Auth-Email': email,
		'X-Auth-Key': apiKey,
		},
	json : true,
	body : {},
	uri,
	},(err,resp,data)=>{
		if(!err){
			if(data.result){
				var i = data.result[0]
				var id = i.id

				// call using optional filter values
				call('GET',`${baseURL}/zones/${id}/dns_records?name=abcdef.${domain}&type=A`,{}).
					then(v=>{
						console.log('vvv',v)
						}).
					catch(err)

				}//if
			}
		else
			console.log('err',err)
		})

/*
OK 200

{ result: 
   [ { id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
       type: 'A',
       name: 'domain.com',
       content: '35.349.334.229',
       proxiable: true,
       proxied: true,
       ttl: 1,
       locked: false,
       zone_id: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
       zone_name: 'domain.com',
       modified_on: '2016-07-28T19:09:49.849310Z',
       created_on: '2016-07-28T19:09:49.849310Z',
       meta: [Object] },

     ...

     { id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
       type: 'MX',
       name: 'domain.com',
       content: 'mx.example.org',
       proxiable: false,
       proxied: false,
       ttl: 1,
       priority: 10,
       locked: false,
       zone_id: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
       zone_name: 'domain.com',
       modified_on: '2015-06-09T15:23:53.340579Z',
       created_on: '2015-06-09T15:23:53.340579Z',
       meta: [Object] }
	],
  result_info: { page: 1, per_page: 20, total_pages: 1, count: 7, total_count: 7 },
  success: true,
  errors: [],
  messages: [] }


*/
