const fs = require('fs')
const data = fs.readFileSync('data.csv', 'utf8').trim().split('\n')

data.forEach((line, index) => {
	const values = line.trim().split(' ').map(Number)
	const countMap = new Map()

	values.forEach(n => countMap.set(n, (countMap.get(n) || 0) + 1))

	const doubles = []
	const uniques = []
	let valid = true

	for (let [num, count] of countMap) {
		if (count === 2) {
			doubles.push(num)
		} else if (count === 1) {
			uniques.push(num)
		} else {
			valid = false
			break
		}
	}

	if (valid && doubles.length === 2) {
		const sumDoubles = doubles[0] + doubles[1]
		const sumUniques = uniques.reduce((a, b) => a + b, 0)

		if (sumDoubles < sumUniques) {
			console.log(`\n✓ Строка ${index + 1}: [${values}]`)
			console.log(
				`  Дважды: ${doubles[0]} и ${doubles[1]} (сумма: ${sumDoubles})`
			)
			console.log(`  Уникальные: [${uniques}] (сумма: ${sumUniques})`)
			console.log(`  ${sumDoubles} < ${sumUniques} - ВЫПОЛНЕНО`)
		}
	}
})
