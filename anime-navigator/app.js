const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Создание папок, если их нет
if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync('./public/uploads')) fs.mkdirSync('./public/uploads', { recursive: true });

// Подключение БД
const db = new sqlite3.Database(path.join(__dirname, 'data', 'anime.db'));

// Настройки
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Настройка загрузки изображений
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Роуты

// Главная - список аниме с фильтрацией и сортировкой
app.get('/', (req, res) => {
  let { sort, filterGenre, search } = req.query;
  let sql = 'SELECT * FROM anime WHERE 1=1';
  let params = [];

  if (filterGenre && filterGenre !== 'all') {
    sql += ' AND genre = ?';
    params.push(filterGenre);
  }

  if (search) {
    sql += ' AND title LIKE ?';
    params.push(`%${search}%`);
  }

  if (sort === 'title') sql += ' ORDER BY title';
  else if (sort === 'year') sql += ' ORDER BY year DESC';
  else if (sort === 'rating') sql += ' ORDER BY rating DESC';
  else sql += ' ORDER BY id';

  db.all(sql, params, (err, rows) => {
    if (err) throw err;
    
    // Получить уникальные жанры для фильтра
    db.all('SELECT DISTINCT genre FROM anime', (err, genres) => {
      res.render('index', { 
        animeList: rows, 
        genres: genres.map(g => g.genre),
        currentSort: sort || '',
        currentGenre: filterGenre || 'all',
        currentSearch: search || ''
      });
    });
  });
});

// Форма добавления
app.get('/add', (req, res) => {
  res.render('add');
});

// Добавление записи
app.post('/add', upload.single('image'), (req, res) => {
  const { title, genre, episodes, year, rating, studio } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  
  db.run(
    'INSERT INTO anime (title, genre, episodes, year, rating, studio, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, genre, episodes, year, rating, studio, image],
    function(err) {
      if (err) {
        console.error(err);
        res.redirect('/');
      } else {
        res.redirect('/');
      }
    }
  );
});

// Форма редактирования
app.get('/edit/:id', (req, res) => {
  db.get('SELECT * FROM anime WHERE id = ?', [req.params.id], (err, row) => {
    if (err || !row) {
      res.redirect('/');
    } else {
      res.render('edit', { anime: row });
    }
  });
});

// Обновление записи
app.post('/edit/:id', upload.single('image'), (req, res) => {
  const { title, genre, episodes, year, rating, studio } = req.body;
  const id = req.params.id;
  
  if (req.file) {
    // С обновлением изображения
    db.run(
      'UPDATE anime SET title = ?, genre = ?, episodes = ?, year = ?, rating = ?, studio = ?, image = ? WHERE id = ?',
      [title, genre, episodes, year, rating, studio, `/uploads/${req.file.filename}`, id],
      (err) => {
        if (err) console.error(err);
        res.redirect('/');
      }
    );
  } else {
    // Без обновления изображения
    db.run(
      'UPDATE anime SET title = ?, genre = ?, episodes = ?, year = ?, rating = ?, studio = ? WHERE id = ?',
      [title, genre, episodes, year, rating, studio, id],
      (err) => {
        if (err) console.error(err);
        res.redirect('/');
      }
    );
  }
});

// Удаление записи
app.post('/delete/:id', (req, res) => {
  db.run('DELETE FROM anime WHERE id = ?', [req.params.id], (err) => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});