const Stream = require('./lib/videoStream');
require('dotenv').config();

const stream = new Stream({
  name: 'name',
  url: process.env.URL,
  wsPort: 9999,
  ffmpegPath: process.env.FFMPEG
});
stream.start();
    