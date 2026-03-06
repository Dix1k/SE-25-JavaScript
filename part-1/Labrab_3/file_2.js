const request = require('sync-request');

module.exports = function () {
    const url = 'http://pcoding-ru.1gb.ru/txt/labrab04-2.txt';
    const data = request('GET', url).getBody('utf8');
    const lines = data.trim().split('\n');

    let count = 0;
    for (let line of lines) {
        const numbers = line.trim().split(/\s+/).map(Number);
        if (numbers.every(n => n % 2 !== 0)) count++;
    }

    return `Количество строк, где все числа нечётные: ${count}`;
};
