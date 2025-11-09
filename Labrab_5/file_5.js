const fs = require('fs');
const data = require('./json/data.js'); // импортируем module.exports

const colors = data.colors;
const argb = data.argb;

// Функция для конвертации RGB в HEX
function rgbToHex(rgb) {
    return '#' + rgb
        .slice(0, 3)                     // только R,G,B, без альфа
        .map(n => n.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
}

// Объединяем массивы в объекты { color, hex_name }
const hexColors = colors.map((color, i) => ({
    color: color,
    hex_name: rgbToHex(argb[i])
}))
.sort((a, b) => a.color.localeCompare(b.color)); // сортировка по имени цвета

// Сохраняем в файл
fs.writeFileSync('./hexColors.json', JSON.stringify(hexColors, null, 4), 'utf-8');

console.log('Файл hexColors.json успешно создан!');
