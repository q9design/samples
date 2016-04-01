<!doctype html>
<html manifest="manifest.appcache<?php echo '?'.microtime(true); ?>">
	<head>
		<script type='text/comments'>

			<?php echo '?'.microtime(true); ?><?php echo microtime(true); ?>
			https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache

			! PREFERS CACHE: System will load from cache first.. then check the manifest file for byte changes (chrome also loads manifset file if comes from ? type get)

			! MIME TYPE: must return text/cache-manifest

			! SAME: Entries listed in the cache manifest must have the same scheme, host, and port as the manifest.

			! BYTE FOR BYTE: (or filename a result of a get? type change) Change manifest content (to update) Browsers only update an application cache when the manifest file changes, byte for byte.

			https://developer.mozilla.org/en-US/docs/nsIDOMOfflineResourceList

			http://www.bennadel.com/blog/1603-jquery-and-script-tags-as-data-containers.htm
			http://caniuse.com/offline-apps9 minutes ago
			http://diveintohtml5.info/offline.html9 minutes ago
			https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
			https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
			http://www.html5rocks.com/en/features/storage
			http://www.w3.org/TR/quota-api/
			https://developer.mozilla.org/en-US/docs/WebGuide/API/File_System/Introduction
			http://www.html5rocks.com/en/tutorials/offline/quota-research/
			http://www.youtube.com/watch?v=Z7sRMg0f5Hk

			 * Filesystem API
			 * IndexedDB

			 use localStorage to bring up webRTC data connection. (for inter window comunication)

			> can load pages quick if manifest file the same. (only change manifest date if project changed)  (though we're already loading pretty fast with small main file?
				The use of an application cache modifies the normal process of loading a document:

				If an application cache exists, the browser loads the document and its associated resources directly from the cache, without accessing the network. This speeds up the document load time.
				The browser then checks to see if the cache manifest has been updated on the server.
				If the cache manifest has been updated, the browser downloads a new version of the manifest and the resources listed in the manifest. This is done in the background and does not affect performance significantly.

			> It's a good idea to set expires headers on your web server for *.appcache files to expire immediately. This avoids the risk of caching manifest files. For example, in Apache you can specify such a configuration as follows:
			  ExpiresByType text/cache-manifest "access plus 0 seconds"

			> The manifest attribute in a web application can specify either the relative path of a cache manifest file or an absolute URL. (Absolute URLs must be from the same origin as the application). A cache manifest file can have any file extension, but it must be served with the MIME type text/cache-manifest

			> file limits? (total and individual files caches) .. failed to load 3MB png files.

			see serviceWorker : https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md

		</script>
		<style>
		</style>
		<xscript src='code.js'></xscript>
		<xlink rel='stylesheet' href='style.css' type='text/css'>
		<script>
			console.log('appliction cache',window.applicationCache)
			if(window.applicationCache) // is there a polyfill?
				{
				var ac = window.applicationCache
				console.log('!!! application cache status',ac.status,statusStr(ac.status))
				ac.addEventListener('checking',function(e){console.log(e,'checking')})
				ac.addEventListener('error',function(e){console.log(e,'error')})
				ac.addEventListener('noupdate',function(e){console.log(e,'nopdate - checked and there was no change.')})
				ac.addEventListener('downloading',function(e){console.log(e,'downloading')})
				ac.addEventListener('progress',function(e){console.log(e,'progress')})
				ac.addEventListener('updateready',function(e){console.log(e,'updateready')})
				ac.addEventListener('cached',function(e){console.log(e,'cached')})

				//ac.update() // there is no application cache to update.
	
				var dom = document.body
				dom.innerHTML = 'hello!'				
				}
			else
				{
				console.log('no applicationCahce?')
				}
			

			function statusStr(i)
				{
				var x = {
					'0' :   "UNCACHED: The object isn't associated with an application cache.", //UNCACHED
					'1' :	"IDLE: The application cache is not in the process of being updated.", //IDLE
					'2' :	"CHECKING: The application cache manifest is being fetched and checked for updates.", // CHECKING
					'3' :	"DOWNLOADING: Resources are being downloaded to be added to the cache.", // DOWNLOADING
					'4' :	"UPDATEREADY: There is a new version of the application cache available.", // UPDATEREADY
					'5' :	"OBSOLETE: The application cache group is now obsolete." //OBSOLETE
					}
				return x[i]
				}
		</script>
	</head>
	<body>
	</body>
</html>
