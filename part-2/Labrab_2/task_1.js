const fs = require('fs')
const data = fs.readFileSync('data.csv', 'utf8').trim().split('\n')

data.forEach((line, index) => {
	const values = line.trim().split(' ').map(Number)
	const unique = new Set(values)
	const sorted = values.toSorted((a, b) => a - b)

	if (
		values.every(n => n % 2) &&
		unique.size === values.length &&
		values.every((n, j) => n === sorted[j])
	) {
		console.log(`Строка ${index + 1} подходит`)
	}
})
