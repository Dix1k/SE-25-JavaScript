const fs = require('fs');

// 1. Загружаем данные
const users = JSON.parse(fs.readFileSync('./json/users.json', 'utf-8'));

// 2. Обрабатываем данные
const result = users
    .filter(user => parseFloat(user.address.geo.lat) < 0) // южное полушарие
    .map(user => ({
        username: user.username,
        city: user.address.city
    })) // оставляем только username и city
    .sort((a, b) => b.city.localeCompare(a.city)); // сортировка по city в обратном порядке

// 3. Выводим результат
console.log(JSON.stringify(result, null, 4));
