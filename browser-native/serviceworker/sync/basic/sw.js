//////////////////////////////////
//
// > SERVICE WORKER
//

// ---------------------------------------

this.addEventListener('install',e=>{
	console.log('installed')
	// we could e.waitUntil(p) // to load cache or other. (and possiblly deside to fail install)
	})//func



// ---------------------------------------

this.addEventListener('fetch',e=>{

	console.log('fetch', e.request)

	e.respondWith( // could respond with a cache match
		new Response(defaultPage,{headers: {'Content-Type':'text/html'}})
		)
	})//func


// ---------------------------------------

this.addEventListener('sync',e=>{ // process sync events
	console.log('sync event',e)
	var tag = e.tag

	if(tag == 'doit'){
		// e.waitUntil(new Promise((res,rej)=>{res(true)}) // fail the promise and you'll be rescheduled.

		console.log('doing the things...',Date.now()/1000)
		}//if
	})

// note could use: self.registration.sync.register .. if have a top-level window open at the origin.

//
////////////////////////////////




////////////////////////////////
//
// > HOST PAGE -- Register a sync 
//

var defaultPage = 
`<!doctype html>
<html>
	<head>
		<title>Sync - service worker</title>
	</head>
	<body>
		<h1>Hello!!<h1>
		<script>
			var err = err=>console.log('err',err)
			console.log("hello!!",navigator)
			navigator.serviceWorker.ready.
				then(reg=>{
					return reg.sync.register('doit')  // one-off sync
					}).
				then(n=>{
					console.log('sync has registered',Date.now()/1000)
					}).
				catch(err)
		</script>
		
	</body>
</html>
`
//////////////////////////////////

