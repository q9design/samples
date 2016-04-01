//////////////////////////////////
//
// > SERVICE WORKER
//

var touch = 1;

// ---------------------------------------

this.addEventListener('install',e=>{
	console.log('install',e)

	e.waitUntil(new Promise((res,rej)=>{
		
		// setup cache

		console.log('wating... 3.5 secs.')
		setTimeout(n=>{console.log('install ready!!');res();},3500)
		}))

	})//func


// ---------------------------------------

this.addEventListener('activate',e=>{

	console.log('activate event', e)

	// clean up from any older versions here .. on wait will block fetch till you're done cleaning.

	e.waitUntil(new Promise((res,rej)=>{
		console.log('wating... 2.5 secs.')
		setTimeout(n=>{console.log('activate ready!!');res();},2500)
		}))
	})//func


// ---------------------------------------

this.addEventListener('fetch',e=>{

	console.log('fetch', e.request)

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
			console.log('hello!',navigator)
		</script>
		
	</body>
</html>
`
//////////////////////////////////

