//
// https://nodejs.org/api/child_process.html
//
var spawn = require('child_process').spawn,
    ls    = spawn('/home/user/Downloads/mongodb-linux-x86_64-ubuntu1404-3.0.5/bin/mongod', ['--dbpath', '/home/user/Downloads/mongodb-linux-x86_64-ubuntu1404-3.0.5/test']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});

process.on('exit',function(){
	console.log('exit')
	})

process.on('SIGINT',function(){
	console.log('bye')
	//process.exit() // must this be called?
	})
