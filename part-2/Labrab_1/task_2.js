let json = `
    { 
        "a": 1, 
        "b":   { "c": 2, "d": 3 }, 
        "e": 4, 
        "fff":{ "v": 10 } 
    };`

// Регулярное выражение
const regex = /"([^"]+)"\s*:\s*(\{[^{}]*\})/g

// Для хранения результатов
const objectValues = []
const fieldNames = []
const pairs = []

const match = (json, regex) =>
	[...json.matchAll(regex)].map(([, fieldName, objectValue]) => ({
		fieldName,
		objectValue,
		pairs: [fieldName, objectValue]
	}))

// Вывод результатов
console.log(match(json, regex))
