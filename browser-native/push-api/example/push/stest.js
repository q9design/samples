var webpush = require('web-push-encryption')

var sub = {"endpoint":"https://android.googleapis.com/gcm/send/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","keys":{"p256dh":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=","auth":"xxxxxxxxxxxxxxxxxxxxxx=="}}


var MY_GCM_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // upg pull from config.json

webpush.setGCMAPIKey(MY_GCM_KEY);

var msg = {
	body: 'works even when chrome is closed.'//,
//	icon: 'icon.png' // upg: send based on detail (like caller's pims pic)
//	action: 'Click to Answer'// this not work?
	}

webpush.sendWebPush(JSON.stringify(msg),sub).
  then(v=>{console.log('result',v)}).catch(e=>console.log('err',e))

