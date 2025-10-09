const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/:index', (req, res) => {
    res.set('Content-Type', 'text/plain; charset=utf-8');
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 1 || index > 5) {
        return res.status(400).send('Ошибка: введите номер задачи от 1 до 5');
    }

    const taskFile = path.join(__dirname, `file_${index}.js`);

    if (!fs.existsSync(taskFile)) {
        return res.status(404).send(`Файл file_${index}.js не найден`);
    }

    try {
        // удаляем кэш, чтобы можно было обновлять файлы без перезапуска сервера
        delete require.cache[require.resolve(taskFile)];
        const solveTask = require(taskFile);

        if (typeof solveTask !== 'function') {
            return res.status(500).send(`file_${index}.js должен экспортировать функцию`);
        }

        const result = solveTask();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Ошибка при выполнении: ' + err.message);
    }
});

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html; charset=utf-8');

    const links = [];
    for (let i = 1; i <= 5; i++) {
        links.push(`<li><a href="/${i}">Задача ${i}</a></li>`);
    }

    res.send(`
        <h2>Лабораторная работа №3</h2>
        <p>Выберите задачу:</p>
        <ul>${links.join('')}</ul>
    `);
});

app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}/`));
