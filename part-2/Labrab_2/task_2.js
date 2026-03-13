const fs = require('fs')
const data = fs.readFileSync('data.csv', 'utf8').trim().split('\n')

data.forEach((line, index) => {
	const values = line.trim().split(' ').map(Number)
	const count = {}

	values.forEach(n => (count[n] = (count[n] || 0) + 1))

	const triple = Object.entries(count).find(([_, c]) => c === 3)
	const otherTriples = Object.entries(count).filter(([_, c]) => c === 3)

	if (otherTriples.length !== 1) return

	const tripleNum = Number(triple[0])
	const otherNum = values.filter(n => n !== tripleNum)

	if (new Set(otherNum).size !== otherNum.length) return

	const avg = otherNum.reduce((a, b) => a + b, 0) / otherNum.length

	if (tripleNum > avg) {
		console.log(`\nСтрока ${index + 1}: [${values}]`)
		console.log(`  Число ${tripleNum} 3 раза > среднего (${avg.toFixed(2)})`)
	}
})
