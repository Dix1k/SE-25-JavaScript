const request = require('sync-request');

module.exports = function () {
    const url = 'http://pcoding-ru.1gb.ru/txt/labrab04-1.txt';
    const data = request('GET', url).getBody('utf8');
    const numbers = data.split(/\s+/).map(Number).filter(n => !isNaN(n));
    const twoDigit = numbers.filter(n => n >= 10 && n <= 99);
    const maxTwoDigit = Math.max(...twoDigit);
    return `Самое большое двузначное число: ${maxTwoDigit}`;
};
