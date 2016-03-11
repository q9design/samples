// ---------------------------------------

this.addEventListener('install',e=>{
	console.log('installed')
	// we could e.waitUntil(p) // to load cache or other. (and possiblly deside to fail install)
	})//func



// ---------------------------------------

this.addEventListener('fetch',e=>{

	console.log('fetch', e.request)

	e.respondWith( // could respond with a cache match
		new Response('hello!!') //,{headers: {'Content-Type':'text/html'}}
		)
	})//func

// see: event 'activate' -- called when switching to a new version of sw(.js) and events e.waitUntil you finish "activating".
