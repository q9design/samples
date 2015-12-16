var nodemailer = require('nodemailer')


var auth = {
	user: user,
	pass: pass
	}

var opts = {
	host: host,
	secure: true,
	debug: true,
	auth: auth
	}

var t = nodemailer.createTransport(opts)

//next: continue here
