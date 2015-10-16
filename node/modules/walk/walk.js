
// npm install walk

var walk = require('walk');
var w = walk.walk('/home/user');

w.on('file',function(r,s,n){
	console.log(r,s.name,s.type,s.size);	
	n();
	});

w.on('end',function(){
	});

w.on('error',function(r,sa,n){
	console.log('ERROR',r,sa);
	n();
	});


/*

{ dev: 2049,
  mode: 33152,
  nlink: 1,
  uid: 1000,
  gid: 1000,
  rdev: 0,
  blksize: 4096,
  ino: 2891756,
  size: 12098,
  blocks: 24,
  atime: Mon Apr 13 2015 09:02:37 GMT-0700 (PDT),
  mtime: Mon Apr 06 2015 14:04:24 GMT-0700 (PDT),
  ctime: Mon Apr 06 2015 14:04:24 GMT-0700 (PDT),
  birthtime: Mon Apr 06 2015 14:04:24 GMT-0700 (PDT),
  name: 'example.txt',
  type: 'file' }

*/
