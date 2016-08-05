var watson = require('watson-developer-cloud');
var fs = require('fs');

var c = JSON.parse(fs.readFileSync('config.json').toString())
console.log(c)
 
var text_to_speech = watson.text_to_speech({
  username: c.credentials.username,
  password: c.credentials.password,
  version: 'v1'
});
 
var params = {
  text: 'Hello from IBM Watson',
  voice: 'en-US_AllisonVoice', // Optional voice 
  accept: 'audio/wav'
};
 
// Pipe the synthesized text to a file 
text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));
