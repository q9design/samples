var watson = require('watson-developer-cloud');
var fs = require('fs');

// http://www.ibm.com/watson/developercloud/doc/speech-to-text/

var c = JSON.parse(fs.readFileSync('config.json').toString())
console.log(c)
 
var text_to_speech = watson.speech_to_text({
  username: c.credentials.username,
  password: c.credentials.password,
  version: 'v1'
});
 

//upg: stream from input command line pipe. .. or is there a stream 
fs.createReadStream('./resources/speech.wav')
  .pipe(speech_to_text.createRecognizeStream({ content_type: 'audio/l16; rate=44100' }))
  .pipe(fs.createWriteStream('./transcription.txt'));

