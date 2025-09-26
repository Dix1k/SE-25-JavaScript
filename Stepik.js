// 1
/* 

const numbers = require('fs')
    .readFileSync(0, 'utf8')
    .split(' ')
    .filter(line => line.length > 0)
    .map(line => +line);

const even = numbers.find(num => num % 2 === 0);

console.log(even);

*/



// 2
/*

const numbers = require('fs')
    .readFileSync(0, 'utf8')
    .trim()
    .split(' ')
    .map(Number);

const oddNumbers = numbers.filter(num => num % 2 !== 0);

console.log(oddNumbers.join(' '));

*/



// 3
/*

const numbers = require('fs')
    .readFileSync(0, 'utf8')
    .trim()
    .split(' ')
    .map(Number);

numbers.sort((a, b) => b - a);

console.log(numbers.join(' '));

*/



// 4
/*

const numbers = require('fs')
    .readFileSync(0, 'utf8')
    .trim()
    .split(' ')
    .map(Number);

const sumThreeSmallest = numbers.sort((a, b) => a - b)
                                .slice(0, 3)
                                .reduce((sum, num) => sum + num, 0);

console.log(sumThreeSmallest);

*/