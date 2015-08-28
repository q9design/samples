//
// 2015.08.21 -- mongodb basics
//
// https://github.com/mongodb/node-mongodb-native
//


// 55d75745a31e24ce212d070c

var mc = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

mc.connect('mongodb://localhost/stress',function(err,db){
	//console.log('db',err,typeof(db))
	var c = db.collection('rand')

	//var s = {_id:ObjectID('55d74864b4c9e633014d7d18')}
	//var s ={_udate:{$gt:1440172112.84,$lt:1440172142.84}}
	var s = {}
	//var s = { ctime:1439124711620}
	var r = c.find(s)//.limit(5)

		r.count(function(err,r){
			console.log('count',r)
			})


		var next = function(){
			r.nextObject(function(err,d){
				if(d){
					console.log(d._id)
					next()
					}
				else
					db.close()
				})
			}
		next()


/*		r.toArray(function(err,r){
		console.log('r',r)
		})//func
*/

	})//func



/*



*/
