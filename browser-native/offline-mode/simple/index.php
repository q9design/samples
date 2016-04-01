<!doctype html>
<html manifest='manifest.appcache?reload-<?php echo microtime(true);?>'>
	<head>
	</head>
	<body>
		<script>

			//next: see memory storage options
			//      work on logic plan to design nimble apps with this.

			var dom = document.body
			dom.innerHTML = 'hello! v'+"<?php echo microtime(true); ?>"

			//boot
			//  - sync from server...  (could use manifest to help hint a change? maybe or not?)
			//  code.js  //upg: polyfill/abstraction lib for local data... fun.

			if(!localStorage['app'])
				{
				var s = document.createElement('script')
				//s.type = 'application/javascript'
				s.src = 'boot.js' // bootstrap
				document.head.appendChild(s)
				}
			else
				{
				var a = localStorage['app']   //compare to eval?
				console.log('run!!',a)
				var s = document.createElement('script')
				s.innerHTML = a
				document.body.appendChild(s)
				}
			
		</script>
	</body>
</html>
