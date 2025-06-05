const Stream = require('./src/server/lib/videoStream');
 
var opt = {};
  
const start = async (item) => { 
    stopStream();
    //for (i = 1; i <= 8; i++) {
        startStream(item);
    //}
}

const init = (setting) => { 
    opt = setting; 
}

const streams = [];

const startStream = (index) => {
    const nt = setTimeout(() => {
        clearTimeout(nt);

        const url = `rtsp://${opt.USER}:${opt.PASSWORD}@${opt.IPADDRESS}:${opt.PORT}/cam/realmonitor?channel=${index}&subtype=0`;
        const wsport = 9999;
        const port = wsport + 1000;

        const stream = new Stream({
            name: 'name-' + index,
            url: url,
            port: port,
            wsPort: wsport,
            ffmpegPath: opt.FFMPEG,
        });
        streams.push(stream);

        stream.start();
    }, 10);
}

const stopStream = () => {
    for (stream of streams) {
        stream.stop();
    }
    streams.splice(0, streams.length);
}

module.exports = {start, init};