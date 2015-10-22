console.log('hello')

var app = require('app')
var BrowserWindow = require('browser-window')

var mainWindow = null

app.on('ready',function(){
	mainWindow = new BrowserWindow({width: 1000, height: 600});
	mainWindow.loadUrl('file://' + __dirname + '/index.html');
	mainWindow.openDevTools();
})

