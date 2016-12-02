// https://www.npmjs.com/package/mp4box
//
// https://github.com/gpac/mp4box.js/blob/master/test/node/info.js
//

const MP4Box = require('mp4box').MP4Box

const fs = require('fs')
const util = require('util')

var opts = JSON.parse(fs.readFileSync('config.json'))
// {"fn":"/home/user/test.mp4"}

var mb = new MP4Box()
mb.onError = e=>{}
mb.onReady = i=>{
	console.log('ready')
	console.log(util.inspect(i,false,null))
	}


var a = fs.readFileSync(opts.fn)
a = (new Uint8Array(a)).buffer

a.fileStart = 0
mb.appendBuffer(a)


console.log(mb,a)

/*

{ hasMoov: true,
  duration: 15617,
  timescale: 600,
  isFragmented: false,
  fragment_duration: 0,
  isProgressive: true,
  hasIOD: true,
  brands: [ 'mp42', 'isom', 'mp42' ],
  created: 1970-01-01T04:59:59.000Z,
  modified: 2016-12-01T22:29:58.000Z,
  tracks: 
   [ { id: 1,
       references: [],
       created: 1904-01-01T05:00:00.000Z,
       modified: 2016-12-01T22:29:59.000Z,
       movie_duration: 15580,
       layer: 0,
       alternate_group: 0,
       volume: 0,
       matrix: Int32Array [ 65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824 ],
       track_width: 1920,
       track_height: 1080,
       timescale: 30,
       duration: 779,
       codec: 'avc1.640028',
       kind: { schemeURI: '', value: '' },
       language: 'und',
       nb_samples: 777,
       size: 33779726,
       bitrate: 10407104.287548138,
       video: { width: 1920, height: 1080 } },
     { id: 2,
       references: [],
       created: 2016-12-01T22:29:59.000Z,
       modified: 2016-12-01T22:29:59.000Z,
       movie_duration: 15617,
       layer: 0,
       alternate_group: 0,
       volume: 1,
       matrix: Int32Array [ 65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824 ],
       track_width: 0,
       track_height: 0,
       timescale: 44100,
       duration: 1147904,
       codec: 'mp4a.40.2',
       kind: { schemeURI: '', value: '' },
       language: 'eng',
       nb_samples: 1121,
       size: 624709,
       bitrate: 191999.7971955843,
       audio: { sample_rate: 44100, channel_count: 2, sample_size: 16 } } ],
  audioTracks: 
   [ { id: 2,
       references: [],
       created: 2016-12-01T22:29:59.000Z,
       modified: 2016-12-01T22:29:59.000Z,
       movie_duration: 15617,
       layer: 0,
       alternate_group: 0,
       volume: 1,
       matrix: Int32Array [ 65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824 ],
       track_width: 0,
       track_height: 0,
       timescale: 44100,
       duration: 1147904,
       codec: 'mp4a.40.2',
       kind: { schemeURI: '', value: '' },
       language: 'eng',
       nb_samples: 1121,
       size: 624709,
       bitrate: 191999.7971955843,
       audio: { sample_rate: 44100, channel_count: 2, sample_size: 16 } } ],
  videoTracks: 
   [ { id: 1,
       references: [],
       created: 1904-01-01T05:00:00.000Z,
       modified: 2016-12-01T22:29:59.000Z,
       movie_duration: 15580,
       layer: 0,
       alternate_group: 0,
       volume: 0,
       matrix: Int32Array [ 65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824 ],
       track_width: 1920,
       track_height: 1080,
       timescale: 30,
       duration: 779,
       codec: 'avc1.640028',
       kind: { schemeURI: '', value: '' },
       language: 'und',
       nb_samples: 777,
       size: 33779726,
       bitrate: 10407104.287548138,
       video: { width: 1920, height: 1080 } } ],
  subtitleTracks: [],
  metadataTracks: [],
  hintTracks: [],
  otherTracks: [] }


MP4Box {
  inputStream: 
   { buffers: [ [Object] ],
     bufferIndex: 0,
     _buffer: ArrayBuffer { byteLength: 34414253, fileStart: 0, usedBytes: 9818 },
     _dataView: DataView { byteLength: 34414253, byteOffset: 0, buffer: [Object] },
     _byteLength: 34414253,
     position: 34414253 },
  keepMdatData: true,
  inputIsoFile: 
   ISOFile {
     stream: 
      { buffers: [Object],
        bufferIndex: 0,
        _buffer: [Object],
        _dataView: [Object],
        _byteLength: 34414253,
        position: 34414253 },
     boxes: [ [Object], [Object], [Object] ],
     mdats: [ [Object] ],
     moofs: [],
     isProgressive: true,
     moovStartFound: true,
     discardMdatData: false,
     lastBoxStartPosition: 34414253,
     ftyp: 
      Box {
        type: 'ftyp',
        size: 24,
        hdr_size: 8,
        start: 0,
        major_brand: 'mp42',
        minor_version: 0,
        compatible_brands: [Object] },
     moov: 
      Box {
        type: 'moov',
        size: 9786,
        boxes: [Object],
        subBoxNames: [Object],
        traks: [Object],
        sidxs: [],
        hdr_size: 8,
        start: 24,
        mvhd: [Object],
        iods: [Object] },
     nextParsePosition: 34414253 },
  onMoovStart: null,
  moovStartSent: true,
  onReady: [Function],
  readySent: true,
  onSegment: null,
  onSamples: null,
  onError: [Function],
  sampleListBuilt: true,
  fragmentedTracks: [],
  extractedTracks: [],
  isFragmentationInitialized: false,
  sampleProcessingStarted: false,
  nextMoofNumber: 0,
  itemListBuilt: false }






ArrayBuffer { byteLength: 34414253, fileStart: 0, usedBytes: 9818 }

*/
