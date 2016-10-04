chrome.omnibox.onInputChanged.addListener((s,res)=>{
	//console.log('s,',s,res)

	    res([
	      	{content: s + " one", description: "the first one"},
      		{content: s + " number two", description: "the second entry"},
       		{content:  "three", description: "the thrid entry "},
       		{content: s + " 44444444", description: "the fourth entry"}


    		]);
	})


// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(t,d) {
    console.log('inputEntered: ' + t,d);
   // alert('You just typed "' + t + '"');
  chrome.tabs.update({url:'https://google.com'})
  });

