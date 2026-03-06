let json = `
    { 
        "a": 1, 
        "b":   { "c": 2, "d": 3 }, 
        "e": 4, 
        "fff":{ "v": 10 } 
    };`;

// Регулярное выражение
const regex = /"([^"]+)"\s*:\s*(\{[^{}]*\})/g;

// Для хранения результатов
const objectValues = [];
const fieldNames = [];
const pairs = [];

let match;
while ((match = regex.exec(json)) !== null) {
    const fieldName = match[1];
    const objectValue = match[2];
    
    fieldNames.push(fieldName);
    objectValues.push(objectValue);
    pairs.push([fieldName, objectValue]);
}

// Вывод результатов
console.log(objectValues);
console.log(fieldNames);
console.log(pairs);