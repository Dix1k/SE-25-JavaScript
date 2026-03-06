const request = require('sync-request');

module.exports = function () {
    const url = 'http://pcoding-ru.1gb.ru/txt/labrab04-3.txt';
    const data = request('GET', url).getBody('utf8').trim().split('\n');
    const arr = data.map(line => {
        const parts = line.split(';');
        const rating = parseFloat(parts[0].replace(',', '.').replace('%', ''));
        const lang = parts[1].trim();
        return [rating, lang];
    });

    // сортировка по названию языка
    arr.sort((a, b) => a[1].localeCompare(b[1]));

    return arr.map(item => `${item[0].toFixed(2)} ${item[1]}`).join('\n');
};
