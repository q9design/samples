//
// 2015.08.21 -- mongodb basics
//
// https://github.com/mongodb/node-mongodb-native
//
var Promise = require('bluebird')
var mdb = Promise.promisifyAll(require('mongodb'))
var crypto = Promise.promisifyAll(require('crypto'))

var url = 'mongodb://localhost/stress'

var err = function(e){console.log('err',e)}

mdb.connectAsync(url).then(function(db){

	db.statsAsync().then(function(s){
		console.log('stats',s)
		console.log('stressing in 3.5 seconds')
		setTimeout(next,3500)	
		}).catch(err)

	var dbc = db.collection('rand')
	dbc.ensureIndex({_udate:1})

	var c = 0
	var next = function(){
		var r = false
		crypto.pseudoRandomBytesAsync(2048).then(function(b){
			r =
				 { 
				  _udate : Date.now()/1000,
				  type: 'file',
				  source_guid: '6fb28645-09d4-4798-a722-b6d47bbf1c24',
				  path: '/home/user/Downloads',
				  name: 'archlinux-2015.08.01-dual.iso',
				  thumb: 'data:image/jpeg;base64,'+b.toString('base64'),
				  ctime: 1439124711620,
				  mtime: 1439124711500,
				  content_type: 'application/x-iso9660-image',
				  size: 688914432,
				  hash: 'sha256:6ee41afe2c27dbe12dae6df41392763b2b7c179588db34e7db1af674c7c5a819' }

			return dbc.insertAsync([r])
			}).
			then(function(r){
				c++
				console.log('rr',c,r.result,r.insertedIds)
				//c>20000?setTimeout(next,0):next()
				next()
				}).
			catch(err)

		}//func

//	next()

	}).catch(err)




/*


record { type: 'file',
  source_guid: '6fb28645-09d4-4798-a722-b6d47bbf1c24',
  path: '/home/user/Downloads',
  name: 'archlinux-2015.08.01-dual.iso',
  thumb: 'data:image/jpeg;base64,SGVsbG8sIFdvcmxkIQ%3D%3D'
  ctime: 1439124711620,
  mtime: 1439124711500,
  content_type: 'application/x-iso9660-image',
  size: 688914432,
  hash: 'sha256:6ee41afe2c27dbe12dae6df41392763b2b7c179588db34e7db1af674c7c5a819' }

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
