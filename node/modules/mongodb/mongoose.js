var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection
db.on('error',function(e){console.log('err',e)})
db.once('open',function(cb){
	console.log('open')
	})
