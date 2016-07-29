//
// 2016.07.29 --- update-a-record
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
var setIP = '192.168.1.100'

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
var zoneID
var recordID
var dnsRecord
call('GET',`${baseURL}/zones?name=${domain}`).
then(v=>{ // get zone id for domain
	var r = v.result[0]
	zoneID = r.id

	return call('GET',`${baseURL}/zones/${zoneID}/dns_records?name=abcdef.${domain}&type=A`)
	}).
then(v=>{
	dnsRecord = v.result[0]
	var recordID = dnsRecord.id
	dnsRecord.content = setIP
	return call('PUT',`${baseURL}/zones/${zoneID}/dns_records/${recordID}`,dnsRecord)
	}).
then(v=>{
	console.log('result',v)
	}).
catch(err)

/*

result { result: 
   { id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
     type: 'A',
     name: 'abcdef.domain.com',
     content: '192.168.2.250',
     proxiable: false,
     proxied: false,
     ttl: 1,
     locked: false,
     zone_id: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
     zone_name: 'domain.com',
     modified_on: '2016-07-29T17:14:11.906961Z',
     created_on: '2016-07-29T17:14:11.906961Z',
     meta: { auto_added: false } },
  success: true,
  errors: [],
  messages: [] }


*/
