next:
	- cache example
	- fetch example
	- push example

https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

chrome://serviceworker-internals/

self.registration.showNotification('hello!')

clients.openWindow() // might be cool to use from an service worker notification click. (because there may be no clients open when a sw is running.)


install (wait) >> activate (wait) >> fetch (wait)


Comunication
	clients.matchAll
	client.postMessage


NOTE LOCATION OF STEPS

	HOST SIDE					SERVICE WORKER.JS SIDE
	------------------------			-----------------------------
		* register					* event: install
	  	* sync.register					* event: activate
								* event: fetch
								* event: sync


