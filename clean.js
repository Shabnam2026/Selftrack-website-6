import fs from 'fs';
const lines = fs.readFileSync('src/About.tsx', 'utf8').split('\n');
const startIdx = 83; // line 84
const endIdx = 205; // line 206
lines.splice(startIdx, endIdx - startIdx + 1);
fs.writeFileSync('src/About.tsx', lines.join('\n'), 'utf8');
