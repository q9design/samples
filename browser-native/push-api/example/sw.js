//
// sw.js
//

console.log('SW: Started 8', self);



// -----------------------------
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('SW: Installed', event);
});



// -----------------------------
self.addEventListener('activate', function(event) {
  console.log('SW: Activated', event);
});



// -----------------------------
self.addEventListener('push', function(event) {

	console.log('SW: Push message received', event);
 
	var d = event.data // must use encrypted to get data.
	if(d)
		d = d.json() // could use .json and blob, etc.
	else
		d = ''

	console.log('SW: data',d)

	var title = d.title||'Phone'
	var body = d.body||'You have a new call'
	var icon = d.icon||'icon.png'
	var action = d.action||'Click to Answer'
	var tag = 'testmsg'

	var o =	{  
	      body,  
	      icon,
	      action, 
	      tag  
		}


	// https://developer.mozilla.org/en-US/docs/Web/API/notification
	// https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification

	console.log('SW: showNotification',title,o)
  	event.waitUntil( self.registration.showNotification(title, o) )
  });


// -----------------------------
self.addEventListener('notificationclick',function(e){
	console.log('SW: notifcatioinclick',e,e.notification.tag)
	e.notification.close()

	  // This looks to see if the current is already open and
	  // focuses if it is

	e.waitUntil(clients.matchAll({type: "window"}).
			then(function(clientList) {
			
				for (var i = 0; i < clientList.length; i++) {
					var client = clientList[i];

					if (client.url == '/' && 'focus' in client)  // upg: send IPC of click details.
						return client.focus();
					}

				if (clients.openWindow)
					return clients.openWindow('/');
			})

		)

	})











/*
zold 2016.06.29 -- could fetch more info before posting msg.

self.addEventListener('push', function(event) {
  console.log('Push message received', event);
 
	var d = event.data
	if(d)
		d = d.text() // could use .json and blob, etc.
	else
		d = ''
 
  event.waitUntil(new Promise((res,rej)=>{  
	fetch('details.json').
		then(v=>{
			console.log('details',v)

		return	 self.registration.showNotification('PIMS Phone', {  
				      body: d+'You have a new call from Bob',  
				      //icon: icon,
				      action: 'Click To Answer', // this override by http url? 
				      tag: 'testmsg'  
				    }) 


			}).
		then(res).
		catch(rej)
	    
  }));

});
*/

