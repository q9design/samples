var blessed = require('blessed')

var screen = blessed.screen({
	smartCSR: true
	});

screen.title = 'window title here'

var log = blessed.log({
	parent: screen,
	top: 0,
	left: 0,
	width: '100%',
	height: '100%-1',
	mouse: true,
	scrollbar : {ch:'<',track:{fg:'white',bg:'black'}},  // type: 'line' .. upg: how to format this better, including showing scrollbar all the time.
	border: {type:'line'},
	style: {bg: 'blue',fg: 'white'},
	padding: 1,
	comment : 'hello'
	})

//screen.append(log)


var input = blessed.textbox({
	parent: screen,
	inputOnFocus: true,
	bottom: 0,
	height: 1,
	keys: true,
	mouse: true,
	wdith: '100%',
	style: {bg: 'black',fg:'yellow'}
	})


input.on('submit',v=>{
	var val = input.value
	input.clearValue()
	log.add(val)
	input.focus()
	})

input.key(['escape','C-c'],function(ch,key){
	console.log('you said',ch,key)	 // key had ctrl/shift etc

	return process.exit(0)
	
})

screen.key(['escape','q','C-c'],function(ch,key){
	console.log('you said',ch,key)	 // key had ctrl/shift etc

	return process.exit(0)
	
})

input.focus()

screen.render()
