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

var apiKey = config.apiKey
var email = config.email
var domain = config.sampleDomain
var baseURL = 'https://api.cloudflare.com/client/v4'
console.log('config',email,apiKey,baseURL)


// https://api.cloudflare.com/#zone-list-zones
var uri = `${baseURL}/zones?name=domain.com`
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
			console.log(resp.statusMessage,resp.statusCode)
			console.log(util.inspect(data,false,null))
			}
		else
			console.log('err',err)
		})

/*
OK 200

{ result: 
   [ { id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
       name: 'domain.com',
       status: 'active',
       paused: false,
       type: 'full',
       development_mode: -2216044,
       name_servers: [ 'beth.ns.cloudflare.com', 'seth.ns.cloudflare.com' ],
       original_name_servers: [ 'beth.ns.cloudflare.com', 'seth.ns.cloudflare.com' ],
       original_registrar: 'pdr ltd. d/b/a publicdomainregistry.com (r27-lror)',
       original_dnshost: null,
       modified_on: '2016-07-28T19:09:49.849310Z',
       created_on: '2015-06-09T14:32:04.548911Z',
       meta: 
        { step: 4,
          wildcard_proxiable: false,
          custom_certificate_quota: 0,
          page_rule_quota: 3,
          phishing_detected: false,
          multiple_railguns_allowed: false },
       owner: 
        { type: 'user',
          id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          email: 'example@example.com' },
       permissions: 
        [ '#analytics:read',
          '#billing:edit',
          '#billing:read',
          '#cache_purge:edit',
          '#dns_records:edit',
          '#dns_records:read',
          '#lb:edit',
          '#lb:read',
          '#logs:read',
          '#organization:edit',
          '#organization:read',
          '#ssl:edit',
          '#ssl:read',
          '#waf:edit',
          '#waf:read',
          '#zone:edit',
          '#zone:read',
          '#zone_settings:edit',
          '#zone_settings:read' ],
       plan: 
        { id: '0feeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          name: 'Free Website',
          price: 0,
          currency: 'USD',
          frequency: '',
          legacy_id: 'free',
          legacy_discount: false,
          is_subscribed: null,
          can_subscribe: null,
          externally_managed: false } } ],
  result_info: { page: 1, per_page: 20, total_pages: 1, count: 1, total_count: 1 },
  success: true,
  errors: [],
  messages: [] }

*/
