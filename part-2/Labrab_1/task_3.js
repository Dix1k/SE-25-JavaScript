const fs = require('fs');
const input = fs.readFileSync('task_03.txt', 'utf8').trim();

const numbers = Array.from(input.matchAll(/[1-9A-F][0-9A-F]*[02468ACE]/g))
    .map(m => m[0]);

const maxLen = Math.max(...numbers.map(n => n.length));
const result = numbers
    .filter(n => n.length === maxLen)
    .reduce((max, cur) => parseInt(cur, 16) > parseInt(max, 16) ? cur : max);

console.log(result);