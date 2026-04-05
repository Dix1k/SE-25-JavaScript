const express = require("express");
const log = console.log;
const Library = require("./library");

const HOST = "localhost",
  PORT = 3000;

const app = express();
app.use(express.json());

const library = new Library();


// Получить все книги (GET — браузер)
app.get("/books", (req, res) => {
  res.json(library.getBooks());
});

// Найти книгу по isbn (GET — браузер)
app.get("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = library.findBook(isbn);

  if (!book) return res.status(404).json({ error: "Книга не найдена" });

  res.json(book);
});

// Добавить книгу (POST — Thunder Client)
app.post("/books", (req, res) => {
  const { title, author, isbn, amount } = req.body;

  library.addBook(title, author, isbn, Number(amount));
  res.json({ message: "Книга добавлена" });
});

// Удалить книгу (DELETE — Thunder Client)
app.delete("/books/:isbn", (req, res) => {
  const { isbn } = req.params;

  library.delBook(isbn);
  res.json({ message: "Книга удалена" });
});


// Получить всех пользователей (GET)
app.get("/users", (req, res) => {
  res.json(library.getUsers());
});

// Добавить пользователя (POST)
app.post("/users", (req, res) => {
  const { firstName, lastName, cardNumber } = req.body;

  library.addUser(firstName, lastName, cardNumber);
  res.json({ message: "Пользователь добавлен" });
});

// Удалить пользователя (DELETE)
app.delete("/users/:cardNumber", (req, res) => {
  const { cardNumber } = req.params;

  library.delUser(cardNumber);
  res.json({ message: "Пользователь удален" });
});


// Выдать книгу (POST)
app.post("/issue", (req, res) => {
  const { cardNumber, isbn } = req.body;

  library.issueBook(cardNumber, isbn);
  res.json({ message: "Книга выдана" });
});

// Вернуть книгу (POST)
app.post("/return", (req, res) => {
  const { cardNumber, isbn } = req.body;

  library.returnBook(cardNumber, isbn);
  res.json({ message: "Книга возвращена" });
});


app.listen(PORT, HOST, () => {
  log(`🚀 Server running at http://${HOST}:${PORT}`);
});


/* 
1. GET (через браузер)

Получить все книги
http://localhost:3000/books

Найти книгу по ISBN
http://localhost:3000/books/12345

Получить всех пользователей
http://localhost:3000/users


2. POST (Thunder Client)

Добавить книгу
POST http://localhost:3000/books

Body (JSON):
{
  "title": "JavaScript Guide",
  "author": "John Doe",
  "isbn": "111",
  "amount": 3
}


Добавить пользователя
POST http://localhost:3000/users

Body:
{
  "firstName": "Ivan",
  "lastName": "Ivanov",
  "cardNumber": "123"
}


Выдать книгу
POST http://localhost:3000/issue

Body:
{
  "cardNumber": "123",
  "isbn": "111"
}


Вернуть книгу
POST http://localhost:3000/return

Body:
{
  "cardNumber": "123",
  "isbn": "111"
}


3. DELETE (Thunder Client)

Удалить книгу
DELETE http://localhost:3000/books/111

Удалить пользователя
DELETE http://localhost:3000/users/123

*/