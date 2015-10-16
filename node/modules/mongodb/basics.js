//
// 2015.08.21 -- mongodb basics
//
// https://github.com/mongodb/node-mongodb-native
//

var mc = require('mongodb').MongoClient

mc.connect('mongodb://localhost/abc',function(err,db){
	console.log('db',err,typeof(db))
	var c = db.collection('tdocs')
	c.insert([{a:3},{b:4},{c:33}],function(err,r){
		console.log(err,r)
		})

	c.update({a:3},{$set:{greet:'hi!'}},function(err,r){ // first match a:3 set/add greet
		console.log(err,r.result)
		})

	c.remove({b:4},function(err,r){
		console.log(err,r.result)
		})

	c.find({}).toArray(function(err,d){
		console.log(err,'d',d)
		})

	setTimeout(function(){db.close()},5000)  // when all done
	})



/*


{ result: { ok: 1, n: 3 },
  ops: 
   [ { a: 3, _id: 55d73d4be4adad0476026bc7 },
     { b: 4, _id: 55d73d4be4adad0476026bc8 },
     { c: 33, _id: 55d73d4be4adad0476026bc9 } ],
  insertedCount: 3,
  insertedIds: 
   [ 55d73d4be4adad0476026bc7,
     55d73d4be4adad0476026bc8,
     55d73d4be4adad0476026bc9 ] }


{ ok: 1, nModified: 0, n: 1 }

{ ok: 1, n: 1 }

[ { _id: 55d73ce3462f7a6e7596681d, a: 3, greet: 'hi!' },
  { _id: 55d73ce3462f7a6e7596681f, c: 33 },
  { _id: 55d73d20f3ed7da875a25d06, a: 3 },
  { _id: 55d73d20f3ed7da875a25d08, c: 33 },
  { _id: 55d73d2fcdba68c17565ac2f, a: 3 }]




*/
