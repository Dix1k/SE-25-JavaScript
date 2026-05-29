const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'data', 'anime.db'));

db.serialize(() => {
  // Таблица аниме
  db.run(`
    CREATE TABLE IF NOT EXISTS anime (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      genre TEXT NOT NULL,
      episodes INTEGER,
      year INTEGER,
      rating REAL,
      studio TEXT,
      image TEXT
    )
  `);

  // Вставка тестовых данных (15 записей)
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO anime (id, title, genre, episodes, year, rating, studio, image) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const animeData = [
    [1, 'Атака Титанов', 'Экшен', 87, 2013, 9.0, 'WIT Studio', ''],
    [2, 'Ванпанчмен', 'Комедия', 24, 2015, 8.7, 'Madhouse', ''],
    [3, 'Наруто', 'Приключения', 720, 2002, 8.5, 'Pierrot', ''],
    [4, 'Клинок, рассекающий демонов', 'Фэнтези', 55, 2019, 9.2, 'Ufotable', ''],
    [5, 'Магическая битва', 'Экшен', 47, 2020, 8.9, 'MAPPA', ''],
    [6, 'Врата Штейна', 'Научная фантастика', 24, 2011, 9.1, 'White Fox', ''],
    [7, 'Тетрадь смерти', 'Триллер', 37, 2006, 9.0, 'Madhouse', ''],
    [8, 'Форма голоса', 'Драма', 1, 2016, 9.3, 'Kyoto Animation', ''],
    [9, 'Соник X', 'Приключения', 78, 2003, 7.2, 'TMS Entertainment', ''],
    [10, 'Ковбой Бибоп', 'Космос', 26, 1998, 8.9, 'Sunrise', ''],
    [11, 'Евангелион', 'Психология', 26, 1995, 8.6, 'Gainax', ''],
    [12, 'Токийский гуль', 'Ужасы', 24, 2014, 7.9, 'Pierrot', ''],
    [13, 'Реинкарнация безработного', 'Фэнтези', 36, 2021, 8.8, 'Studio Bind', ''],
    [14, 'Вайлет Эвергарден', 'Драма', 13, 2018, 9.1, 'Kyoto Animation', ''],
    [15, 'Невероятные приключения ДжоДжо', 'Экшен', 190, 2012, 8.8, 'David Production', '']
  ];

  for (const anime of animeData) {
    stmt.run(anime);
  }
  stmt.finalize();

  console.log('База данных инициализирована с 15 записями');
});

db.close();