chrome.omnibox.onInputChanged.addListener((s,res)=>{
	//console.log('s,',s,res)

	    res([
    		{content: 'fill', description: "fill the tab with content."}
    		]);
	})


// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(t,d) {
    console.log('inputEntered: ' + t,d);
   	// alert('You just typed "' + t + '"');
  	// chrome.tabs.update({url:'https://google.com'})
	  console.log('ccc',chrome)
	  chrome.tabs.getCurrent(function(t){console.log('tab is',t)}) // undefined
	  chrome.tabs.update({url:"data:text/html;base64,YWE="},function(t){
		  console.log('tttt',t)
	  	})
  });

