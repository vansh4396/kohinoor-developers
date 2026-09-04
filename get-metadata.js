const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const ffmpegStatic = require('ffmpeg-static');
const ffprobeStatic = require('ffprobe-static');

ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);

const dir = path.join(__dirname, 'brand assets');
const videos = ['1.mp4', '2.mp4', '3.mp4', '4.mp4'];

videos.forEach(vid => {
    ffmpeg.ffprobe(path.join(dir, vid), (err, metadata) => {
        if (err) {
            console.error(vid, err.message);
        } else {
            const stream = metadata.streams.find(s => s.codec_type === 'video');
            console.log(`Video: ${vid}, Duration: ${stream.duration}, FPS: ${stream.r_frame_rate}, Resolution: ${stream.width}x${stream.height}, Frames: ${stream.nb_frames}`);
        }
    });
});
