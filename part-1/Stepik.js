
// Циклы
// №1
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const num1 = input[0];
const num2 = input[1];

function sumDigits(str) {
  return str.split("").reduce((sum, ch) => sum + Number(ch), 0);
}

const result = sumDigits(num1) + sumDigits(num2);
console.log(result);
*/


// №2
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const n = parseInt(input[0], 10);
const temps = input.slice(1, n + 1).map(Number);

const maxTemp = Math.max(...temps);
console.log(maxTemp);
*/


// №3
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n").map(Number);

const [a, b, c] = input;

const sum = [a, b, c].sort((x, y) => y - x).slice(0, 2).reduce((acc, val) => acc + val, 0);

console.log(sum);
*/


// №4
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(" ").map(Number);

const result = input.slice(0, 5).reduce((sum, num) => sum + num, 0);

console.log(result);
*/


// №5
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(" ").map(Number);

const evenNumber = input.find(num => num % 2 === 0);

console.log(evenNumber);
*/


// №6
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(" ").map(Number);

let evenCount = 0;
let oddCount = 0;

for (const num of input) {
  if (num % 2 === 0) {
    evenCount++;
  } else {
    oddCount++;
  }
}

if (evenCount > oddCount) {
  console.log("even");
} else if (oddCount > evenCount) {
  console.log("odd");
} else {
  console.log("equal");
}
*/


// №7
/*
const fs = require("fs");
const N = parseInt(fs.readFileSync(0, "utf-8"), 10);

const fingers = [1, 2, 3, 4, 5, 4, 3, 2];
const index = (N - 1) % fingers.length;
console.log(fingers[index]);
*/


// №8
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const N = parseInt(input[0], 10);
const numbers = input[1].split(" ").map(Number);

let sum = 0;
let result = -1;

for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
  if (sum > N) {
    result = i + 1;
    break;
  }
}

console.log(result);
*/


// №9
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const N = parseInt(input[0], 10);
let minNumber = Infinity;

for (let i = 1; i <= N; i++) {
  const num = parseInt(input[i], 10);
  if (num % 10 === 3 && num < minNumber) {
    minNumber = num;
  }
}

console.log(minNumber);
*/



// Массивы
// №1
/* 
const numbers = require('fs')
    .readFileSync(0, 'utf8')
    .split(' ')
    .filter(line => line.length > 0)
    .map(line => +line);

const even = numbers.find(num => num % 2 === 0);

console.log(even);
*/


// №2
/*
const numbers = require('fs')
    .readFileSync(0, 'utf8')
    .trim()
    .split(' ')
    .map(Number);

const oddNumbers = numbers.filter(num => num % 2 !== 0);

console.log(oddNumbers.join(' '));
*/


// №3
/*
const numbers = require('fs')
    .readFileSync(0, 'utf8')
    .trim()
    .split(' ')
    .map(Number);

numbers.sort((a, b) => b - a);

console.log(numbers.join(' '));
*/


// №4
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


// №5
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = parseInt(input[0], 10);
let minNum = 30001;

for (let i = 1; i <= N; i++) {
    const num = parseInt(input[i], 10);
    if (num % 10 === 3 && num < minNum) {
        minNum = num;
    }
}

console.log(minNum);
*/


// №6
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
const nums = input.split(" ").map(Number);
const total = (100 * 101) / 2;
const sum = nums.reduce((acc, x) => acc + x, 0);
const missing = total - sum;
console.log(missing);
*/


// №7
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
const nums = input.split(" ").map(Number);
const expected = (100 * 101) / 2;
const sum = nums.reduce((acc, x) => acc + x, 0);
const duplicate = sum - expected;
console.log(duplicate);
*/


// №8
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
const nums = input.split(" ").map(Number);
const missing = nums.reduce((acc, x) => acc ^ x, 0);
console.log(missing);
*/


// №9
/*
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = parseInt(input[0], 10);

const langs = input.slice(1).map(line => {
    const [name, ratingStr] = line.split(";");
    return { name, rating: parseFloat(ratingStr) };
});

langs.sort((a, b) => b.rating - a.rating);
console.log(langs[N - 1].name);
*/