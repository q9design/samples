// 2014.07.11
var get = function(url,p){
	return post(url,p,{method:'GET'})
}

var post = function(url,p,opts){ //supports blob types / automatically stringifies objects
	return new Promise(function(res,rej){ 
		if(!opts) opts = {}
		var method = 'POST'

		var x = new XMLHttpRequest();
		if(opts.method)
			method = opts.method

		method.toUpperCase()
		x.open(method,url,true) //upg: add rej on fail.
		x.responseType = 'blob' // blob holds data, length and content type.
		x.onload = function(e){
			var r = e.target.response
			res(e.target.response)
			}
		var f = new FormData();
		for(var i in p){
			var v = p[i]
			if(typeof(v) != 'string')
				{
				if(!( 
                                      (v instanceof Blob)
				    )
				  ) //other exclude types?
					{
					v = JSON.stringify(v)
					}//if
				}//if

			f.append(i,v)
			}//for

		x.send(f)
		})//promise
	}//func
