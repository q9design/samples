// https://developer.chrome.com/extensions/content_scripts

console.log('running background.js')

var port = chrome.runtime.connect()
console.log('port',port)

chrome.browserAction.onClicked.addListener(function(t){

	window.addEventListener('message',function(e){
		console.log('eee',e)
		})

	chrome.tabs.executeScript(null,{file:"inject.js"})
	})

