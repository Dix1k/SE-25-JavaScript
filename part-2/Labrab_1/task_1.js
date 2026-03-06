const user = "Иванов Иван Иванович";

// Нумерованные группы
const result_num = user.replace(/(\S+)\s+(\S+)\s+(\S+)/, "$2 $1");

// Именованные группы
const result_im = user.replace(/(?<lastName>\S+)\s+(?<firstName>\S+)\s+(?<patronymic>\S+)/, "$<firstName> $<lastName>");

// Вывод результатов
console.log(result_num);
console.log(result_im);