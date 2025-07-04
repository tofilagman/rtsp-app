const {genFfmpegFormatConfigs} = require('./configs');
const child_process = require('child_process');
const EventEmitter = require('events');

class Mpeg1Muxer extends EventEmitter {

  constructor(options) {
    super(options)

    this.url = options.url;
    this.port = options.port;
    this.ffmpegPath = options.ffmpegPath;

    this.stream = child_process.spawn(this.ffmpegPath, genFfmpegFormatConfigs(this.url, this.port), {
      detached: false
    });

    this.inputStreamStarted = true
    this.stream.stdout.on('data', (data) => { return this.emit('mpeg1data', data) })
    this.stream.stderr.on('data', (data) => { return this.emit('ffmpegError', data) })
  }

  close() { 
    this.stream.kill();  
  }
}

module.exports = Mpeg1Muxer
