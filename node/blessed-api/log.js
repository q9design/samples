var blessed = require('blessed')

var screen = blessed.screen({
	smartCSR: true
	});

screen.title = 'window title here'


var log = blessed.log({
	parent: screen,
	top: 0,
	left: 0,
	width: 30,
	height: 10,
	border: {type:'line'},
	style: {bg: 'blue'},
	comment : 'hello'
	})

screen.append(log)

var input = blessed.textarea({})

screen.append(input)


screen.key(['escape','q','C-c'],function(ch,key){
	console.log('you said',ch,key)	 // key had ctrl/shift etc

	return process.exit(0)
	
})

screen.render()
