var swr = false

var err = e=>console.log('err',e)

// upg: subscribe button (so to wait for prompt till then)
var subscribe = n=>{ // try/check subscribe (nice to post sub anyway for verify check?

  swr.pushManager.getSubscription().then(v=>{

		var sync = sub=>{
					var js = JSON.stringify(sub) // upg: post sub .. could it change?

					console.log('main: endpoint:',sub, sub.endpoint,js);


					document.body.textContent = js
					var id = location.hash.split('#').pop()

					if(id && id != '')
						localStorage['push-api-id'] = id
					else
					if(localStorage['push-api-id'])
						id = localStorage['push-api-id']

					var f = new FormData()
					f.append('id',id)
					f.append('endpoint',js)

					var x = new XMLHttpRequest()
					x.open('POST','post.php',true)
					x.onload = e=>{
						console.log('loaded',e,f+'')
						}
					x.send(f)

			}//func

		// -----------------------------
		if(v){
			console.log('main: we are already subscribed')
			sync(v)
			}
		else{// sub
			console.log('main: subscribing')

			     swr.pushManager.subscribe({
				    userVisibleOnly: true
				}).then(sync,err)

			}
		}).catch(err)

}// func




if ('serviceWorker' in navigator) {
 console.log('main: Service Worker is supported');

 navigator.serviceWorker.register('sw.js').then(function(reg) {

	swr = reg

   console.log('main: service worker registered :^)', reg);

	navigator.serviceWorker.ready.then(n=>{ // this need be here ? or a better way?
		console.log('main: serviceWorker.ready!!')

		subscribe()  // upg: check if subscribed and offer button to install (install or similar? bar.) .. or at some other logical point when will need it.
		}).catch(err)



 }).catch(function(err) {
	   console.log('main:  SW registgration failed. (sw not supported?) :^(', err);
 		});

}
else
	console.log('main: service worker not in navigator')
