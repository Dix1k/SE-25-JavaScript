const fs = require('fs')

// Работа с файлами
function readJSON(file) {
	try {
		return JSON.parse(fs.readFileSync(file))
	} catch {
		return []
	}
}

function writeJSON(file, data) {
	fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

// Классы
class Book {
	#id
	#title
	#author
	#isbn

	constructor(id, title, author, isbn) {
		this.#id = id
		this.#title = title
		this.#author = author
		this.#isbn = isbn
	}

	get title() {
		return this.#title
	}
	get author() {
		return this.#author
	}
	get isbn() {
		return this.#isbn
	}
}

class User {
	constructor(id, firstName, lastName, cardNumber) {
		this.id = id
		this.firstName = firstName
		this.lastName = lastName
		this.cardNumber = cardNumber
		this.books = []
	}

	getBook(isbn) {
		this.books.push(isbn)
	}

	returnBook(isbn) {
		this.books = this.books.filter(b => b !== isbn)
	}
}

class Library {
	#books = []
	#users = []

	constructor() {
		this.#books = readJSON('books.json')
		this.#users = readJSON('users.json')
	}

	save() {
		writeJSON('books.json', this.#books)
		writeJSON('users.json', this.#users)
	}

	// Функции для команд
	addBook(title, author, isbn, amount) {
		try {
			let book = this.#books.find(b => b.isbn === isbn)

			if (book) {
				book.total += amount
			} else {
				this.#books.push({
					title,
					author,
					isbn,
					total: amount,
					issued: 0
				})
			}

			this.save()
			console.log('✅ Книга добавлена')
		} catch (e) {
			console.error(e.message)
		}
	}

	delBook(isbn) {
		try {
			const bookIndex = this.#books.findIndex(b => b.isbn === isbn)

			if (bookIndex === -1) {
				throw new Error('❌ Книга не найдена')
			}

			const book = this.#books[bookIndex]

			if (book.issued > 0) {
				throw new Error(
					`❌ Нельзя удалить книгу: ${book.issued} экземпляр(ов) выдано`
				)
			}

			this.#books.splice(bookIndex, 1)
			this.save()
			console.log('🗑️ Книга удалена')
		} catch (e) {
			console.error(e.message)
		}
	}

	findBook(isbn) {
	return this.#books.find(b => b.isbn === isbn)
}

	issueBook(cardNumber, isbn) {
		try {
			let book = this.#books.find(b => b.isbn === isbn)
			let user = this.#users.find(u => u.cardNumber == cardNumber)

			if (!book) {
				throw new Error('❌ Книга не найдена')
			}

			if (book.total - book.issued <= 0) {
				throw new Error('❌ Нет доступных экземпляров')
			}

			if (!user) {
				throw new Error('❌ Пользователь не найден')
			}

			book.issued++
			user.books.push(isbn)

			this.save()
			console.log('📖 Книга выдана')
		} catch (e) {
			console.error(e.message)
		}
	}

	returnBook(cardNumber, isbn) {
		try {
			let book = this.#books.find(b => b.isbn === isbn)
			let user = this.#users.find(u => u.cardNumber == cardNumber)

			if (!book) {
				throw new Error('❌ Книга не найдена')
			}

			if (!user) {
				throw new Error('❌ Пользователь не найден')
			}

			if (!user.books.includes(isbn)) {
				throw new Error('❌ У пользователя нет этой книги')
			}

			book.issued--
			user.books = user.books.filter(b => b !== isbn)

			this.save()
			console.log('🔄 Книга возвращена')
		} catch (e) {
			console.error(e.message)
		}
	}

	getBooks() {
		return this.#books
	}

	addUser(firstName, lastName, cardNumber) {
		try {
			let id = Date.now()

			if (this.#users.find(u => u.cardNumber === cardNumber)) {
				throw new Error('❌ Такой номер карты уже существует')
			}

			this.#users.push({
				id,
				firstName,
				lastName,
				cardNumber,
				books: []
			})

			this.save()
			console.log('👤 Пользователь добавлен')
		} catch (e) {
			console.error(e.message)
		}
	}

	delUser(cardNumber) {
		try {
			const userIndex = this.#users.findIndex(u => u.cardNumber === cardNumber)

			if (userIndex === -1) {
				throw new Error('❌ Пользователь не найден')
			}

			const user = this.#users[userIndex]

			if (user.books.length > 0) {
				throw new Error(
					`❌ Нельзя удалить пользователя: у него есть ${user.books.length} выданных книг`
				)
			}

			this.#users.splice(userIndex, 1)
			this.save()
			console.log('👤 Пользователь удален')
		} catch (e) {
			console.error(e.message)
		}
	}

	getUsers() {
		if (this.#users.length === 0) {
			console.log('📭 Нет зарегистрированных пользователей')
			return
		}
		return this.#users
	}
}

if (require.main === module) {
	const library = new Library()
	const [, , command, ...args] = process.argv

	switch (command) {
		case 'addBook':
			library.addBook(args[0], args[1], args[2], Number(args[3]))
			break

		case 'delBook':
			library.delBook(args[0])
			break

		case 'findBook':
			library.findBook(args[0])
			break

		case 'issueBook':
			library.issueBook(args[0], args[1])
			break

		case 'returnBook':
			library.returnBook(args[0], args[1])
			break

		case 'getBooks':
			library.getBooks()
			break

		case 'addUser':
			library.addUser(args[0], args[1], args[2])
			break

		case 'delUser':
			library.delUser(args[0])
			break

		case 'getUsers':
			library.getUsers()
			break

		default:
			console.log('❓ Неизвестная команда')
	}
}

module.exports = Library;