//////////////////////////////////
//
// > SERVICE WORKER
//

var touch = 1;

var err = err=>console.log('err',err)

// ---------------------------------------

this.addEventListener('install',e=>{
	console.log('install',e,new Date())
	})//func


// ---------------------------------------

this.addEventListener('activate',e=>{

	console.log('activate event', e,new Date())

	console.log('Application installed and activated.')
	})//func


// ---------------------------------------

this.addEventListener('fetch',e=>{


	console.log('fetch', e,e.request,clients,new Date())

	clients.matchAll({}).then(l=>{
		console.log('client list',l)
/*
			WindowClient
				focused		: true
				frameType 	: "top-level"
				id 		: "0FD7EDE4-13ED-486A-99BD-A20625E4EBC1"
				url 		: "https://lab.synchsys.net:8080/clients/match-all/"
				visibilityState	: "visible"
*/


		}).catch(err)

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
		<title>Service Worker</title>
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

