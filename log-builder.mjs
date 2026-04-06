import { appendFileSync } from 'fs';

function log() {
    appendFileSync('dist/log1.log', new Date().toISOString() + '\n');
}

setInterval(log, 500);