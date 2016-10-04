console.log('ppp')
document.querySelector('div').textContent = 'pip'

chrome.desktopCapture.chooseDesktopMedia(['screen','window'], function(s) {
	console.log('bbb',s)
	document.querySelector('div').textContent = 'po'
	})
