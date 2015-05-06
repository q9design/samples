var tools = new (function(){
	//globals
	window.onevt = function(e){console.log('e',e)}

	// 2014.08.01 -- blobable post (returns text or blob or array buffer)
	// http://www.html5rocks.com/en/tutorials/file/xhr2/
	// upg: to allow different result types? (and other options like cors and credentails?) -- by two part? or by opts param.
	this.post = function(url,p,opts){ //supports blob types / arraybuffer types / automatically stringifies objects
		var x
		var res =  new Promise(function(res,rej){ 
			//console.log('posting...',url,p)
			x = new XMLHttpRequest();
			x.open('POST',url,true) //upg: add rej on fail.
			if(!opts) opts = {}
			if(opts.blob)
				x.responseType = 'blob' // blob holds data, length and content type.
			if(opts.arraybuffer)
				x.responseType = 'arraybuffer' // blob holds data, length and content type.

			if(opts.responseType)
				x.responseType = opts.responseType

			x.onload = function(e){
				var r = e.target.response  //upg: auto return json? and/or from option?
				//console.log(e.target)
				//var type = r.type
				//var classType = type.split('/').shift().toLowerCase()
				//var subType = type.split('/').pop().toLowerCase()
				//upg: automatically convert to text on text result?
				if(e.target.responseType == ''){ //upg: opt for not auto json?
					//console.log('string?',r)
					try{
						r = JSON.parse(r)
						}
					catch(e){}
					}

				res(r)
				}
			var f = new FormData();
			for(var i in p){
				var v = p[i]
				if(typeof(v) != 'string') // complex objects
					{
					if(v.buffer) // arraybuffer subtypes?
						v = v.buffer

					if(v instanceof ArrayBuffer)
						v = new Blob([v],{type:'application/octet-stream'})

					if(!( 
		                              (v instanceof Blob) ||
		                              //(v instanceof ArrayBufferView) ||
		                              (v instanceof Document)
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
		res.abort = x.abort
		return res
		}//func

	this.x = function(){}
})();

