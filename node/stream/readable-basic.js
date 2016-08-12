//
// https://github.com/substack/stream-handbook
//

var Readable = require('stream').Readable

var rs = new Readable

rs.push('hello')
rs.push(' ')
rs.push('world\n')
rs.push(null)

rs.pipe(process.stdout)
