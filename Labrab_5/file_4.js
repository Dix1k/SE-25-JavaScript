const fs = require('fs');

// Загружаем данные
const colorsData = JSON.parse(fs.readFileSync('./json/colors.json', 'utf-8'));

// Преобразуем и сортируем
const result = colorsData
    .map(colorObj => {
        const colorName = Object.keys(colorObj)[0];       // название цвета
        const rgbArray = Object.values(colorObj)[0].slice(0, 3); // первые 3 элемента
        return { color: colorName, rgb: rgbArray };
    })
    .sort((a, b) => a.color.localeCompare(b.color));      // сортировка по имени цвета

console.log(JSON.stringify(result, null, 4));
