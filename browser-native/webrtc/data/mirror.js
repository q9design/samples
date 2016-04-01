var mirror = new (function(){
	this.newMirror = function(){
		return new (function(){
		var here = this

		this.onmessage = null

		this.send = function(m){
			console.log('sending msg',m)
			var mm = {add:m}
			tools.post('mirror.php',mm).then(function(r){
				console.log('mirror result',r)
				})
			}//func

		//-------------------------
		var _since = false
		var _listen = false
		var listen = function(){
			if(_listen) _listen.abort()
			var m = {}
			if(_since)
				m.since = _since
			_listen = tools.post('mirror.php',m)
			_listen.then(function(r){
				console.log('listen result',r)
				r.result.forEach(function(v){
					if(typeof(here.onmessage) == 'function')
						here.onmessage(v)
					})
				_since = r.size
				}).
				catch(function(e){
					console.log('err',e)
					}).//func
				then(function(r){
					_listen = false
					listen()
					})//func
			}//func

		listen()


		})();//new func
		}//func

	})();//new func
