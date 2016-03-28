this.nice4html = function(s)
{
	var e = document.createElement('div')
	e.innerText = s
	return e.innerHTML
}

this.userType = function()
	{
	// https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
	// In summary, we recommend looking for the string "Mobi" anywhere in the User Agent to detect a mobile device.
	var result = 'unknown'//mobile, tablet, bigscreen, desktop
	var ua = Navigator.userAgent || ""
	ua = ua.toLowerCase()
	if(ua.indexOf('mobi') >= 0)
		result = 'mobile'
	else
		result = 'desktop'
	return result
	}

///////////////////////
this.post = function(url,params,cb,ercb)
{//upgade to promise (does it already have a promise mode?)
"use strict"
var f = new FormData()

if(params)
	{
	Object.keys(params).forEach(function(t){  // is there an auto way this?
		var v = params[t]
		if(typeof(v) != 'string')
			v = JSON.stringify(v)
		f.append(t,v)
		})
	}
var x = new XMLHttpRequest()
x.open('POST',url,true)
x.onload = function(e){ // includes 404
		//console.log('onload',this,e)
		var v = this.response
		try{ // convert from json if possible (make an edgecase 'raw' version of post if case appaers?)
			v = JSON.parse(v)
		}catch(e){}
		if(cb) cb(v)
		if(this.status != 200) // could be 404
			{
			console.log('load status',this.status)
			}
		}
x.onabort = function(e){
		console.log('abort',this,e)
		}
x.onerror = function(e){
		console.log('err',this,e)
		if(cb) cb(false) //??
		}
x.ontimeout = function(e){
		console.log('timeout',this,e)
		if(cb) cb(false) //??
		}

x.timeout = 15000; // so we'll abort sooner (perhaps we should walk this up on multiple issues?)
x.send(f)

return x
}


