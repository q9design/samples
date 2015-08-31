//upg-idea: make something like this? -- or use existing lib?

//upg: review this basic construct and consider.. it sure is nice to be able to nimble('tools').. but are promises nice enough?
//     can we do this same thing here in js.. or maybe a hybred solutions that builds a giant .js to pull from? .. perhaps a lite lite version of nimble like things.

//upg: make this a pInclude (promise include) .. so can do a bunch at once?

//upg: callback on ready? .. or will it hold here? .. how to keep it to hold here? ... blocking post?

// it's fun to work with things like this! :)

var include = function(v,cb) //assumes once?
	{
	result = false

	if(typeof(include.list) == 'undefined') // keep in this scope
		include.list = {}

	var list = include.list

	if(typeof(list[v]) == 'undefined')
		{//
	//	console.log('new instance...')
		//upg add .js if no extention listed.?

		var x = new XMLHttpRequest()
		x.open('GET',v+'.js',true)
		x.onload = function(e){ 
				// console.log('d',this,e) 
				//upg: check result type for error
				var p = this.response
				var _p = p.s
				var w = 'result = new (function (){'+p+'})()'
				//console.log('run...',w)
				eval(w) // is there a beter way? .. is this code as optimized as loaded from a <script> tag?
				//console.log('we have',result)
				list[v] = result

				if(typeof(cb) == 'function')
					cb(result)
			}
		x.send()
		}
	else
		{
	//	console.log('existing instance...')
		result = list[v]
		}

	return result
	}
