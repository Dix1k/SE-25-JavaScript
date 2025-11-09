const fs = require('fs');

// Загружаем данные
const colorsData = JSON.parse(fs.readFileSync('./json/colors.json', 'utf-8'));

// 1. Вытаскиваем названия цветов
const colorNames = colorsData
    .map(obj => Object.keys(obj)[0])          // берём ключ объекта
    .filter(name => name.length < 6)          // короткие (<6 символов)
    .sort((a, b) => a.localeCompare(b));      // сортировка по алфавиту

console.log(JSON.stringify(colorNames, null, 4));
