//
// https://github.com/substack/stream-handbook
//

const fs = require('fs')
const Readable = require('stream').Readable

var rs = new Readable()
var ws = fs.createWriteStream('temp.txt')
rs.pipe(ws)

rs.push('hello')
rs.push(' ')
rs.push('world\n')
rs.push(null)


