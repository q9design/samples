// 2014.07.11
var post = function(url,p){ //supports blob types / automatically stringifies objects
	return new Promise(function(res,rej){ 
		var x = new XMLHttpRequest();
		x.open('POST',url,true) //upg: add rej on fail.
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
