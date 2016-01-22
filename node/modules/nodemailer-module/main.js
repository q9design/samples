var nodemailer = require('nodemailer')
var argv = require('minimist')(process.argv.slice(2))

// upg: dkim?
// upg: how to check if the connection is secure mode before sending message.

console.log(argv)

// --host=smtp.your-domain.com --user=you@your-domain.com --pass=yourpasswordhere

var host = argv.host
var user = argv.user
var pass = argv.pass

var from = argv.from
var to = argv.to


var auth = {
	user: user,
	pass: pass
	}

var opts = { // https://github.com/andris9/nodemailer-smtp-transport#usage
	host,
	port:587,
	secure: false, // options.secure defines if the connection should use SSL (if true) or not (if false)  : port 587 can upgrade to TLS  (STARTTLS)
	debug: true,
	auth
	}

console.log(opts)

var t = nodemailer.createTransport(opts) // can use auto opt settings by service name: https://github.com/andris9/nodemailer-wellknown#supported-services
console.log(t)


var m = {
	from,
	to,
	subject: 'hi',
	text: 'hello!',
	html: '<b>hello!</b>'
	}

t.sendMail(m,(err,info)=>{
	console.log('sendmail',err,info)
	})

