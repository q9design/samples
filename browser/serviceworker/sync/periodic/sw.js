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

	e.respondWith( // could respond with a cache match
		new Response(defaultPage,{headers: {'Content-Type':'text/html'}})
		)

	})//func


// ---------------------------------------

this.addEventListener('periodicsync',e=>{ // process periodic sync events
	console.log('periodic sync event',e)

	var tag = e.registration.tag

	if(tag == 'doit'){
		// e.waitUntil(new Promise((res,rej)=>{res(true)})

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

					// see also: reg.periodicSync.getRegistration / getRegistrations / reg.unregister()
					console.log('service worker ready',reg)

					return reg.periodicSync.register({ 		// https://github.com/WICG/BackgroundSync/blob/master/explainer.md#the-api-1
						tag: 'doit',
						minPeriod: 1/12 * 60 * 60 * 1000,  	// def: 0
						powerState: 'avoid-draining', 	   	// or auto
						networkState: 'avoid-celluar'		// online (default,) avoid-celluar, any.
						})
					}).
				then(r=>{
					console.log('sync has registered',r)
					}).
				catch(err)

		</script>
		
	</body>
</html>
`
//////////////////////////////////

