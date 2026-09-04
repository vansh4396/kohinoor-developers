const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegStatic);

const inputDir = path.join(__dirname, 'public', 'assets');
const outputBaseDir = path.join(__dirname, 'public', 'assets', 'frames');

if (!fs.existsSync(outputBaseDir)) {
    fs.mkdirSync(outputBaseDir, { recursive: true });
}

const videos = [
    { file: '1.mp4', folder: 'v1' },
    { file: '2.mp4', folder: 'v2' },
    { file: '3.mp4', folder: 'v3' },
    { file: '4.mp4', folder: 'v4' }
];

async function extractFrames(videoInfo) {
    return new Promise((resolve, reject) => {
        const inputPath = path.join(inputDir, videoInfo.file);
        const outputDir = path.join(outputBaseDir, videoInfo.folder);

        if (!fs.existsSync(inputPath)) {
            console.log(`Input video not found: ${inputPath}`);
            return resolve(); // Skip if file doesn't exist
        }

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log(`Extracting frames from ${videoInfo.file} to ${outputDir}...`);

        ffmpeg(inputPath)
            .fps(30)
            .size('1280x720') // Resize to 720p to save memory/bandwidth
            .outputOptions([
                '-q:v 3', // JPEG quality (2-31, lower is better, 3 is good quality/size trade-off)
            ])
            .output(path.join(outputDir, 'frame_%04d.jpg'))
            .on('end', () => {
                console.log(`Finished extracting ${videoInfo.file}`);
                resolve();
            })
            .on('error', (err) => {
                console.error(`Error extracting ${videoInfo.file}:`, err);
                reject(err);
            })
            .run();
    });
}

async function run() {
    console.log('Starting frame extraction...');
    for (const video of videos) {
        await extractFrames(video);
    }
    console.log('All frames extracted successfully!');
}

run().catch(console.error);
