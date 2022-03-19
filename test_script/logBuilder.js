const fs = require('fs');

function log() {
    fs.appendFileSync('log1.txt', new Date().toISOString() + '\n');
    fs.appendFileSync('log2.txt', new Date().toISOString() + '\n');
}

setInterval(log, 500);