var v = document.querySelectorAll('img')
var images = ([...v]).map(v=>v.src)

var a = ([...(document.querySelectorAll('a'))]).map(v=>v.href)

var text = document.body.textContent

var m = {images,a,location:JSON.parse(JSON.stringify(location)),text}
console.log('posting',m)



window.postMessage(m,"*")
