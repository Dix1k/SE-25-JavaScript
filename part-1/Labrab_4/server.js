const express = require('express');
const { HOST, PORT } = { "HOST": "localhost", "PORT": 3000 };

const app = express();

// Парсинг данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Статические файлы (CSS, изображения и т.п.)
app.use(express.static('public'));

// Функция перевода числа в заданную систему счисления
const convertToBase = (num, base) => {
    if (num === 0) return '0';

    const digits = '0123456789ABCDEF';
    let result = '';

    while (num > 0) {
        const remainder = num % base;
        result = digits[remainder] + result;
        num = Math.floor(num / base);
    }

    return result;
};

// Генерация HTML-страницы с явным указанием Content-Type и charset
const getHtml = (result = '') => {
    return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Конвертер систем счисления</title>
        <link rel="stylesheet" type="text/css" href="/style.css">
    </head>
    <body>
        <h1>Конвертер систем счисления</h1>
        <form method="POST" action="/">
            <label>
                Введите число (десятичное):
                <input type="text" name="inputNumber" required>
            </label>
            <br><br>
            <label>
                Основание системы счисления (2–16):
                <input type="number" name="base" min="2" max="16" required>
            </label>
            <br><br>
            <button type="submit">Перевести</button>
        </form>
        <br>
        <div id="result">
            ${result}
        </div>
    </body>
    </html>`;
};

// Обработчик GET-запроса
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(getHtml());
});

// Обработчик POST-запроса
app.post('/', (req, res) => {
    const inputNumber = req.body.inputNumber.trim();
    const baseStr = req.body.base;

    // Проверка корректности ввода
    const num = parseInt(inputNumber, 10);
    const base = parseInt(baseStr, 10);

    if (isNaN(num) || isNaN(base) || num < 0) {
        res.set('Content-Type', 'text/html; charset=utf-8');
        res.send(getHtml('<p style="color:red">Ошибка: введите корректное неотрицательное число</p>'));
        return;
    }

    if (base < 2 || base > 16) {
        res.set('Content-Type', 'text/html; charset=utf-8');
        res.send(getHtml('<p style="color:red">Ошибка: основание должно быть от 2 до 16</p>'));
        return;
    }

    // Перевод числа
    const converted = convertToBase(num, base);
    const resultText = `<p>${num}_{10} = ${converted}_{${base}}</p>`;

    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(getHtml(resultText));
});

// Запуск сервера
app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен: http://${HOST}:${PORT}/`);
});
