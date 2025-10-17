const fs = require('fs');

// Загружаем данные
const data = JSON.parse(fs.readFileSync('./json/clients.json', 'utf-8'));

// Получаем массив клиентов
const clients = data.clients;

// Фильтруем и сортируем
const result = clients
    .filter(client => client.address.city === "Кунгур") // только Кунгур
    .sort((a, b) => {
        // Сортировка по полу (female -> male)
        if (a.gender !== b.gender) {
            return a.gender === 'female' ? -1 : 1;
        }
        // По возрасту (по убыванию)
        if (a.age !== b.age) {
            return b.age - a.age;
        }
        // По имени (по возрастанию)
        return a.name.localeCompare(b.name);
    });

// Выводим результат
console.log(JSON.stringify(result, null, 4));
