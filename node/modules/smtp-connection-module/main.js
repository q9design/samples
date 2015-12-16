var SMTPConnetion = require('smtp-connection')
var argv = require('minimist')(process.argv.slice(2))

console.log(argv)

// --host=smtp.your-domain.com --user=you@your-domain.com --pass=yourpasswrodhere

var host = argv.host
var user = argv.user
var pass = argv.pass
var opts = {
		host:host,
		secure: false,
		port: 587,
		debug: true
		}

if(argv.name)
	opts.name = argv.name

var auth = {user: user,
	    pass: pass}

console.log('opts auth',opts)

var c = new SMTPConnetion(opts)

c.on('connect',function(){
	console.log('connected',c.secure?'secure':'non-secure')
	//upg: only log in if secure?
	c.login(auth,function(err){console.log('login',!err)
		if(!err){
			c.send({
				from:'lab@domain.org',
				to: 'lab2@domain2.com'
				},'Subject: Hello\r\n\r\nHello! from node.js',
				function(cc,r,rc){
					console.log(cc,r,rc)
					c.quit()
					})
			}//if
		})
	})

c.on('error',function(err){console.log('err',err)})

c.on('log',function(data){console.log('log',data)})

c.on('end',function(){console.log('end')})

c.connect(function(){console.log('connection call back')})

