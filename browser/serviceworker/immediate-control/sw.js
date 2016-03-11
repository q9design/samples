//////////////////////////////////
//
// > SERVICE WORKER
//

var touch = 1;

var err = err=>console.log('err',err)

// ---------------------------------------

this.addEventListener('install',e=>{
	console.log('install',e,new Date())

	e.waitUntil(new Promise((res,rej)=>{
		
		// setup cache

		console.log('wating... 0.5 secs.')
		setTimeout(n=>{
			console.log('install ready!!',self);
			self.skipWaiting() // after install don't wait for older clients to close.
			res();
			},500)
		}))

	})//func


// ---------------------------------------

this.addEventListener('activate',e=>{

	console.log('activate event', e,new Date())

	// clean up from any older versions here .. on wait will block fetch till you're done cleaning.

	e.waitUntil(new Promise((res,rej)=>{
		console.log('wating... 1 sec.')
		setTimeout(n=>{
			console.log('activate ready!!',self);

			self.clients.claim(). // become the current sw for currently open clients.
				then(v=>{
					console.log('clients have been claimed')
					}).
				catch(err)

			res();
			},1000)
		}))
	})//func


// ---------------------------------------

this.addEventListener('fetch',e=>{

	console.log('fetch', e,e.request,new Date())

	e.respondWith( // could respond with a cache match
		new Response(defaultPage,{headers: {'Content-Type':'text/html'}})
		)
	})//func




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
		<h1>Hello!!!!!<h1>
		<script>
			var err = err=>console.log('err',err)
			console.log('hello!',navigator,new Date())
		</script>
		
	</body>
</html>
`
//////////////////////////////////

