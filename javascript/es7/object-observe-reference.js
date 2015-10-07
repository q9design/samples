var x = {a:1,b:2}


function watch(){

	Object.observe(x,function(l){
		console.log('changes',l)
		})

	}

watch()
watch()
watch()
	
// all three remember

setInterval(function(){
	x.a++
	},1500)
