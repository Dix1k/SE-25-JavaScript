const request = require('sync-request');

module.exports = function () {
    const url = 'http://pcoding-ru.1gb.ru/txt/labrab04-2.txt';
    const data = request('GET', url).getBody('utf8');
    const lines = data.trim().split('\n');

    let maxSum = -Infinity;
    let maxIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const numbers = lines[i].trim().split(/\s+/).map(Number);
        const oddSum = numbers.filter(n => n % 2 !== 0).reduce((a, b) => a + b, 0);
        if (oddSum > maxSum) {
            maxSum = oddSum;
            maxIndex = i;
        }
    }

    return `Индекс строки с максимальной суммой нечётных чисел: ${maxIndex}\nСумма = ${maxSum}`;
};
