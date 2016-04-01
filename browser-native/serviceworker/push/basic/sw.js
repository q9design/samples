// ---------------------------------------

// this.addEventListener('install',e=>{console.log('installed')})//func

// ---------------------------------------

this.addEventListener('fetch',e=>{e.respondWith(new Response(defaultHTML,{headers: {'Content-Type':'text/html'}}))})//func


// ---------------------------------------

this.addEventListener('pushsubscriptionchange',e=>{console.log('subscription has changed')})//func


// ---------------------------------------

self.addEventListener('push',e=>{
	console.log("a push event",e)
	
	var data = e.data //.arrayBuffer() / .blob() / .json() / .text()

	// process data .. 

	var n = new Notification('hello!',{
		body: 'hi',
		tag: 'abc',
		icon: 'url/to/icon.jpg'
		})

	n.addEventListener('click',e=>{
		clients.openWindow('http://...')
		})

	})




//////////////////////////////////////////////////
var defaultHTML =
`
sw
<script>
	var err = err=>console.log('err',err)

	navigator.serviceWorker.ready.then(v=>{
		console.log('sw ready',v)
		v.pushManager.subscribe({}).then(s=>{
			console.log('subscription',s)
			var endpoint = s.endpoint // send this client session endpoint to your application server.  (special secret url)
			}).catch(err)
		}).catch(err)
</script>
`

/////////////////////////////////////////////////

