var blessed = require('blessed')

var screen = blessed.screen({
	smartCSR: true
	});

screen.title = 'window title here'


var b = blessed.box({
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	border: {type:'line'},
	style: {bg: 'blue',fg:'white'},
	tags: true, // like bold tag
	content : 'hello {bold}bob{/bold}!'
	})

var bb = blessed.box({
	parent: b,
	top: 'center',
	left: 'center',
	width: 15,
	height: 3,
	tags: true,
	content: '\n{center}center :){/center}'
	})



screen.append(b)

screen.key(['escape','q','C-c'],function(ch,key){
	console.log('you said',ch,key)	 // key had ctrl/shift etc

	return process.exit(0)
	
})

screen.render()
