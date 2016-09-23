//
// 2016.09.21 -- fuse-bindings basic
//

// npm i --save fuse-bindings  ... (make sure fuse dev lib is installed before npm install)

var fuse = require('fuse-bindings')

//upg: promiseify?

var mountPath = process.platform !== 'win32' ? __dirname+'/mnt' : 'M:\\'

// mkdir ./mnt  (leave empty)



// https://github.com/mafintosh/fuse-bindings#api


console.log('mount',mountPath)
fuse.mount(mountPath, new (function(){
	
	// ---------------------------------
	this.readdir = (path,cb)=>{
		// names of things in path
		if(path=='/')
			cb(0,['test']) // ,'a.txt','b.jpg'])
		else
			cb(0)
		}//func

	// ---------------------------------
	this.getattr = (path,cb)=>{
		// attributes of things in path
		if(path =='/'){
			cb(0, {
				mtime: new Date(),
				atime: new Date(),
				ctime: new Date(),
				size: 100,
				mode: 16877,
				uid: process.getuid ? process.getuid() : 0,
				gid: process.getgid ? process.getgid() : 0
			      })
			}
		else
		    if (path === '/test'){ // || path === '/a.txt' || path === '/b.jpg') {
		      cb(0, {
			mtime: new Date(),
			atime: new Date(),
			ctime: new Date(),
			size: 12,
			mode: 33188,
			uid: process.getuid ? process.getuid() : 0,
			gid: process.getgid ? process.getgid() : 0
		      })
			}
		else
			 cb(fuse.ENOENT)
		}//func


	// ---------------------------------
	this.open = (path,flags,cb)=>{
		// return a reference file handle # (anything else?)

		cb(0,42) // 42 is an fd (file descriptor made up?)
		}//func


	// ---------------------------------
	this.read = (path,fd,buf,len,pos,cb)=>{
		// read content to buf (from source @ pos and len)
		var s = 'hello!'.slice(pos) 
		if(!s)
			cb(0) // signal done
		else{
			buf.write(s)
			cb(s.length)
			}
		}//func


	// -------------------------------
	

	})(),

	// mount result
	function (err) {
	  if (err) throw err
	  console.log('filesystem mounted on ' + mountPath)
	})


// -----------------------------------------------------
process.on('SIGINT', function () {
  fuse.unmount(mountPath, function () {
    console.log('filesystem at ' + mountPath + ' unmounted')
    process.exit()
  })
})
