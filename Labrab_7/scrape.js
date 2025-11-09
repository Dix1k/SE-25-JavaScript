const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');

// URL турнирной таблицы (ваш вариант)
const url = 'https://premierliga.ru/tournament-table/?category=table&tournament=722&stage=0&match=all';

// Выбираем столбцы для парсинга (не менее 4-х)
const columns = [
  'Клуб',
  'И',   // Игры
  'В',   // Победы
  'Н',   // Ничьи
  'П',   // Поражения
  'Мячи', // Забито-пропущено
  'О'    // Очки
];

async function scrapeTable() {
  try {
    console.log('Загружаем страницу...');
    
    // Получаем HTML страницы
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    console.log('Страница загружена. Парсим данные...');

    // Загружаем HTML в cheerio
    const $ = cheerio.load(data);
    const tableData = [];

    // Находим все строки таблицы (исключая заголовок)
    $('.table-base__row').each((index, row) => {
      const $row = $(row);
      
      // Пропускаем строки без данных или заголовки
      if ($row.find('.table-base__cell').length < 8) {
        return;
      }

      const teamData = {};

      // Парсим нужные столбцы по порядку (индексам ячеек)
      teamData['Клуб'] = $row.find('.table-base__cell:eq(1)').text().trim();
      teamData['И'] = $row.find('.table-base__cell:eq(2)').text().trim();
      teamData['В'] = $row.find('.table-base__cell:eq(3)').text().trim();
      teamData['Н'] = $row.find('.table-base__cell:eq(4)').text().trim();
      teamData['П'] = $row.find('.table-base__cell:eq(5)').text().trim();
      teamData['Мячи'] = $row.find('.table-base__cell:eq(6)').text().trim();
      teamData['О'] = $row.find('.table-base__cell:eq(7)').text().trim();


      tableData.push(teamData);
    });

    // Проверяем, что данные найдены
    if (tableData.length === 0) {
      console.error('Ошибка: не удалось найти данные таблицы. Проверьте селекторы.');
      return;
    }

    console.log(`Найдено команд: ${tableData.length}`);


    // Сохраняем в JSON
    fs.writeFileSync('rpl_table.json', JSON.stringify(tableData, null, 2), 'utf-8');
    console.log('Данные сохранены в rpl_table.json');


    // Сохраняем в CSV
    const csv = new ObjectsToCsv(tableData);
    await csv.toDisk('rpl_table.csv');
    console.log('Данные сохранены в rpl_table.csv');

  } catch (error) {
    console.error('Ошибка при парсинге:', error.message);
    
    if (error.response) {
      console.error('Статус ответа сервера:', error.response.status);
    } else if (error.request) {
      console.error('Нет ответа от сервера. Проверьте URL и подключение к интернету.');
    } else {
      console.error('Ошибка настройки запроса:', error.code);
    }
  }
}

// Запускаем парсинг
scrapeTable();
