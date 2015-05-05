// see also npm install chuncking-streams

var fs = require('fs');
var rs = fs.createReadStream('hello-world.ogg');

var i = 0;

var a = '';

var read = function(n){
    console.log('READ',n);
    var c;
    
    var ci = 0
    while (null !== (c = rs.read(n))) {
        ci ++
        var l = c.length;
        var v = c.toString();
        a += v;
        i += l;
        console.log('c',ci,c,l, i);   
        }
        
    console.log('last read =',c)
    
    }
    
rs.on('readable',function(e){
    console.log('readable');
    read(10000);
    
    });

rs.on('end',function(e){
  
    console.log('end',i);
    
    });
    
