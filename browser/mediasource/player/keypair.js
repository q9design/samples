//	var ls = new storageObject()
//	ls.getItem('example-tag').then(function(d){console.log('get',d)})
//	ls.setItem('test',5).then(function(d){console.log('set',d)})
//	ls.getItem('test').then(function(d){console.log('get',d)})
//	ls.setItem('example-tag','hello!').then(function(d){console.log('set',d)})

	//console.log(webkitStorageInfo)

	// -------------------------------------------------


	function storageObject() //upg: option for async or synch?
		{
		//upg: setters and getters?
		//upg: removeItem
		//upg: clear()

		var KEYSTORE_NAME = 'hde_cache'

		//upg: 'extended' return value? .. return tag/value both.
		var here = this

		var version = 1
		var r = indexedDB.open(KEYSTORE_NAME,version)		

		var db = false
		var queue = []

		r.onerror = function(e){console.log('error',e)}

		r.onsuccess = function(e){
			db = e.target.result
			console.log('db "'+db.name+'" ready',db)
			console.log('calling flush...')
			flush()
			}

		r.onupgradeneeded = function(e){ // called only once (when the open # changes)
					// i think this gets called before 'onsuccess'
					console.log('CREATING DB!')
					var db = e.target.result
					var s = db.createObjectStore('store',{keyPath: "tag"}) 
					}

		var process = function(m)
			{
			//console.log('processing..',m)
			var cmd = m.cmd
			if(cmd == 'set')
				{
				db.transaction('store',"readwrite").objectStore('store').put({tag:m.tag,val:m.val}).
					onsuccess = function(e){
						var key = e.target.result
						m.res(key)
						}
				}
			else
			if(cmd == 'get')
				{
				db.transaction('store',"readonly").objectStore('store').get(m.tag).
					onsuccess = function(e){
						var val = e.target.result //note: val may be undefined. (if key missing)
						if(val)
							val = val.val
						m.res(val)
						}
				}
			}

		var flush = function(){ //only call once db working
			console.log('flushing....',queue)
			queue.forEach(function(v){
				process(v)				
				})
			}

		this.setItem = function(tag,val)
			{
			var p = new Promise(function(res,rej){
				var m = {cmd:'set',tag:tag,val:val,res:res,rej:rej}
				if(!db)
					{
					queue.push(m)
					}
				else
					{
					process(m)
					}
				
				})
			return p
			}

		this.getItem = function(tag)
			{
			var p = new Promise(function(res,rej){
				var m = {cmd:'get',tag:tag,res:res,rej:rej}
				if(!db)
					{
					queue.push(m)
					}
				else
					{
					process(m)
					}
				})
			return p
			}

		}//func
