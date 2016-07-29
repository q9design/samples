// upg: dns examples in node/samples

// see zzzz.io / cloudflare

const Promise = require('bluebird')
const stun = Promise.promisifyAll(require('vs-stun'))
const dns = Promise.promisifyAll(require('dns'))

var domain = 'example.com'

// get ips -- could use other easy get my ip request urls.
Promise.all([
	stun.connectAsync({host:'stun.l.google.com',port:19302}),
	dns.lookupAsync(domain)
	]).
then(v=>{
	var s = v.shift()
	var lookupIP = v.shift() // 93.184.216.34

	var sd = s.stun
	var liveIP = sd.public.host
	var natType = sd.type
	
	var match = liveIP == lookupIP
	console.log(natType,liveIP,'==',lookupIP,'match',match)

	s.close() // close socket

	//if !match then update system
	}).
catch(e=>console.log(e))

/*
{ local: { host: '0.0.0.0', port: 37622 },
  public: { host: '350.49.23.221', port: 37622, family: 'IPv4' },
  type: 'Full Cone NAT' }
*/

/////////////////////////////////
/*
dns.lookup(domain,(e,v)=>{
	console.log('IP',v)
	})




// get domain ip
/*
dns.lookup(domain,(err,addr,fam)=>{
	console.log('eaf',err,addr,fam)
	})

console.log('using servers',dns.getServers())

dns.reverse('64.233.176.139',(err,hostnames)=>{
	console.log('hostnames',err,hostnames)
	})

dns.resolve(domain,'CNAME',(err,v)=>{
	console.log('list',v)
	})
*/
